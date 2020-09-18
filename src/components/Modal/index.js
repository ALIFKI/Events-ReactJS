import { Modal, Button } from 'antd';
import React from 'react'
import { connect } from 'react-redux';
import { addGenre, getGenre, editGenre } from '../../redux/actions/genre';
import InputLogin from '../Input';
import openNotificationWithIcon from '../Notif';
class MyModal extends React.Component {
    constructor(props){
        super(props)
        this.textInput = React.createRef()
    }
  state = {
    ModalText: 'Content of the modal',
    visible: false,
    confirmLoading: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    let data = {
        genre : this.textInput.current.state.data,
        token : this.props.auth.auth.token
    }
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
        this.props.addGenre(data).then((res)=>{
            this.setState({
                visible: false,
                confirmLoading: false,
            });
            openNotificationWithIcon('success','Success!!',res.value.data.msg)
            this.props.getGenre(data)
        }).catch((err)=>{
            this.setState({
                visible: false,
                confirmLoading: false,
            });
            openNotificationWithIcon('error','Error',err.response.data.msg)
        })
    }, 2000);
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible, confirmLoading, ModalText } = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.showModal} style={{
            marginBottom: 16,
          }}>
          Add Genre
        </Button>
        <Modal
          title="Add Genre"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
        <InputLogin name={'Genre'} required={true} placeholder={'Genre'} type={'text'} ref={this.textInput}/>

        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state=>({
    auth : state.auth,
    genre : state.genre,
})
const mapDispatchToProps = {addGenre,getGenre}
export default connect(mapStateToProps,mapDispatchToProps)(MyModal)