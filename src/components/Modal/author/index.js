import { Modal, Button } from 'antd';
import React from 'react'
import { connect } from 'react-redux';
import InputLogin from '../../Input';
import openNotificationWithIcon from '../../Notif';
import {addAuthor, getAuthor} from '../../../redux/actions/author'
class MyModalAuthor extends React.Component {
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
        author : this.textInput.current.state.data,
        token : this.props.auth.auth.token
    }
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
        this.props.addAuthor(data).then((res)=>{
            this.setState({
                visible: false,
                confirmLoading: false,
            });
           openNotificationWithIcon('success','Success!!',res.value.data.msg)
            this.textInput.current.reset()
            this.props.getAuthor(data)
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
    console.log('Clicked cancel button');
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
          Add Author
        </Button>
        <Modal
          title="Add Author"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
        <InputLogin name={'Author'} required={true} placeholder={'Author'} type={'text'} ref={this.textInput}/>

        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state=>({
    auth : state.auth,
    author : state.author,
})
const mapDispatchToProps = {addAuthor,getAuthor}
export default connect(mapStateToProps,mapDispatchToProps)(MyModalAuthor)