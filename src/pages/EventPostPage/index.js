import React,{ Component } from 'react'
import { Button,Container, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import Style from '../../styles/LoginStyle.module.css'
import { Link, Redirect } from 'react-router-dom'
import Logo from '../../images/bookshelf.png'
import { notification } from 'antd';
import InputLogin from '../../components/Input';
import { addEvents } from '../../redux/actions/admin'
import {connect} from 'react-redux';
import openNotificationWithIcon from '../../components/Notif'
import image from '../../images/post.svg'
import NavbarComponent from '../../components/Navbar';


class EventPost extends Component {
    constructor(props,refs){
        super(props,refs)
        this.state = {
          isLoading : false,
        }
        //get Ref From Child input
        this.textInput = React.createRef();
        this.note = React.createRef();
        this.date = React.createRef();
        this.participant = React.createRef();
        this.image = React.createRef();
        this.location = React.createRef();
    }
    //Handle Data
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
          this.props.history.push('/dashboard')
          openNotificationWithIcon('success','Success',res.value.data.msg)
      }).catch((err)=>{
          openNotificationWithIcon('error','Error',err.response.data.msg)
          console.log(err)
      })

    }
    componentDidMount(){

    }
    render(){
      // console.log(this.props.auth)
        return(
          <Container fluid={true}>
              <Row>
                <NavbarComponent/>
              </Row>
              <Row className={'pt-4'}>
                <Col md='6'>
                    <div className='d-flex flex-column w-100 h-100 pt-2'>
                      <div className='flex-grow-1 d-flex justify-content-center align-items-center p-3'>
                        <Form className='login-form mb-5' onSubmit={this.handleOnsubmit}>
                            <div className={Style.title}>
                                <h1 onClick={this.openNotification}>Add Events</h1>
                            </div>
                            <div className='input-wrapper no-gutter'>
                                <InputLogin name={'title'} required={true} placeholder={'Title Event'} type={'text'} value={this.state.username} ref={this.textInput}/>
                                <InputLogin name={'Note'} required={true} placeholder={'Note'} type={'text'} value={this.state.note} ref={this.note}/>
                                <InputLogin name={'Date'} required={true} placeholder={'Date'} type={'date'} value={this.state.date} ref={this.date}/>
                                <InputLogin name={'Location'} required={true} placeholder={'Location'} type={'text'} value={this.state.date} ref={this.location}/>
                                <InputLogin name={'Participant'} required={true} placeholder={'Participant'} type={'text'} value={this.state.participant} ref={this.participant}/>
                                <InputLogin name={'Image'} required={true} placeholder={''} type={'file'} value={''} ref={this.image} />
                            </div>
                          <div className={`d-flex flex-row justify-content-between mt-4 ${Style.fP}`}>
                            <div>

                            </div>
                          </div>
                          <div className='mt-4 mb-5 pb-4 pt-3'>
                            <Button className={`btn right-btn ${Style.btnLogin} ${Style.fP}`} type='submit' style={{backgroundColor: 'black'}}>Create</Button>
                          </div>
                        </Form>
                      </div>
                      </div>
                </Col>
                <Col md='6' className={`p-0 ${Style.remove}`}>
                  <div className={`d-flex flex-column w-100 align-items-center`}>
                      <div className={Style.coverImage}>
                          <div className={Style.textblock}>
                            <img src={image} alt="nope"/>
                          </div>
                      </div>
                  </div>
                </Col>
              </Row>
            </Container>
        )
}
}
const mapStateToProps = (state)=>(
{
  data : state.admin
}
)

const mapDispatchToProps = {addEvents}

export default connect(mapStateToProps,mapDispatchToProps)(EventPost)