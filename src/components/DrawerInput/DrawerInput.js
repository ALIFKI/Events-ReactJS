import { Drawer, Space,Input,Select,notification } from 'antd';
import React,{ Component } from 'react'
import { Form,Button } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom'
import Style from "./DrawerInputStyle.module.css";
import InputLogin from '../Input';
import {
PlusOutlined
} from '@ant-design/icons';
import { Editor } from '@tinymce/tinymce-react';
import Axios from 'axios';
import openNotificationWithIcon from '../../components/Notif' 
import { addEvents,getEvents } from '../../redux/actions/admin';
import { connect } from 'react-redux';
const { Option } = Select;

class DrawerInput extends Component {
    constructor(props,refs){
        super(props,refs)
        this.state = { 
          data : {
            author : [],
            genre : []
          },
          visible: false, 
          placement: 'right',
          active : '',
          content : '',
          title : '',
          image : '',
          participant : '',
          note : '',
          date : '',

       };
       //get Ref from Child Component
       this.textInput = React.createRef();
       this.note = React.createRef();
       this.date = React.createRef();
       this.participant = React.createRef();
       this.image = React.createRef();
       this.location = React.createRef();

    }
    componentDidMount(){
      this.getData()

    }
    getData = ()=>{
      let data = {
        search : '',
        page : 1,
        order : 'title',
        sort  : 1,
        by : 'title',
        limit : 5
      }
      this.props.getEvents(data).then((res)=>{
        console.log(res)
      }).catch((err)=>{
        console.log(err)
      })
    }
    openNotification = () => {
        notification.open({
          message: 'helo',
          description:
            'msg',
          onClick: () => {
            // console.log('Notification Clicked!');
          },
        });
      };
    showDrawer = () => {
      this.setState({
        visible: true,
        active : 'is-active'
      });
    };

    onClose = () => {
      this.setState({
        visible: false,
        active : ''
      });
    };

    onChange = e => {
      this.setState({
        placement: e.target.value,
      });
    };
    //genreSelect
    //handel Tiny mCe change
    handleEditorChange = (content,editor)=>{
        this.setState({
            content : content
        })
    }
    //handel Form submit
    handleOnsubmit = (event) =>{
      event.preventDefault();
      const formData = new FormData()
      formData.append('title',this.textInput.current.state.data);
      formData.append('image',this.image.current.state.image[0]);
      formData.append('note',this.note.current.state.data);
      formData.append('participan',this.participant.current.state.data);
      formData.append('date',this.date.current.state.data);
      formData.append('location',this.location.current.state.data);
      console.log(formData)
      this.props.addEvents(formData).then((res)=>{
          this.setState({
            visible : false,
          })
          this.textInput.current.reset()
          this.image.current.resetImage()
          openNotificationWithIcon('success','Success',res.value.data.msg)
          // this.props.getBook(this.props.auth.auth.token);
      }).catch((err)=>{
          openNotificationWithIcon('error','Error',err.response.data.msg)
          console.log(err)
      })

    }

  render() {
    const { placement, visible } = this.state;
    return (
      <>
        <Space>
        <Link className={`btn right-btn ml-2 ${Style.btnInfo} ${Style.fP} ${Style.buttonRound}`} to='/'>
          <PlusOutlined/>
        </Link>
        </Space>
        <Drawer
          placement={placement}
          closable={false}
          onClose={this.onClose}
          visible={visible}
          key={placement}
          width={400}
          // maskStyle={{opacity:0,backgroundColor: 'rgba(0, 0, 0, 0.0)'}}
        >
            <div className="d-flex flex-column justify-content-center align-items-center">
                <h3 onClick={()=>{this.setState({visible : false})}}>Add Events</h3>
                <Form onSubmit={this.handleOnsubmit}>
                <InputLogin name={'title'} required={true} placeholder={'Title Event'} type={'text'} value={this.state.username} ref={this.textInput}/>
                <InputLogin name={'Note'} required={true} placeholder={'Note'} type={'text'} value={this.state.note} ref={this.note}/>
                <InputLogin name={'Date'} required={true} placeholder={'Date'} type={'Date'} value={this.state.date} ref={this.date}/>
                <InputLogin name={'Location'} required={true} placeholder={'Location'} type={'text'} value={this.state.date} ref={this.location}/>
                <InputLogin name={'Participant'} required={true} placeholder={'Participant'} type={'text'} value={this.state.participant} ref={this.participant}/>
                  <InputLogin name={'Image'} required={true} placeholder={''} type={'file'} value={''} ref={this.image} />
                <Button className={`btn right-btn ${Style.btnLogin} ${Style.fP}`} type='submit' style={{backgroundColor: 'black'}}>Create</Button>
                </Form>

            </div>
        </Drawer>
      </>
    );
  }
}

const mapStateToProps = state =>({
  auth : state.auth,
})
const mapDispatchToProps = {addEvents,getEvents}


export default connect(mapStateToProps,mapDispatchToProps)(DrawerInput)
