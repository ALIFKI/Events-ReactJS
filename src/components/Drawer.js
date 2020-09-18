import { Drawer, Badge ,Space,Avatar,Popover,Button } from 'antd';
import React, { Component } from 'react'
// import { NavbarToggler } from 'reactstrap';
import Style from "../styles/DrawerStyle.module.css";
import {
  MenuOutlined,
  BookOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { connect } from 'react-redux';
import { logout } from '../redux/actions/auth';
import { getTransaction, returnBook } from '../redux/actions/history';
import openNotificationWithIcon from './Notif';
import History from './History';


class DrawerApp extends Component {
    constructor(props){
        super(props)
        this.state = { 
          visible: false, 
          placement: 'right',
          active : '',
          user : {},
          history : []
       };
      //  console.log(props)
    }

  showDrawer = () => {
    this.setState({
      visible: true,
      active : 'is-active'
    });
  };
  //get History 
  handleHistory = ()=>{
    let data = {
      id : this.props.auth.auth.id,
      token : this.props.auth.auth.token
    }
    this.props.getTransaction(data).then((res)=>{
      // console.log(res)
    })
        // axios({
      //     method : 'GET',
      //     url : '${process.env.REACT_APP_URL_API}api/transactions/user?search=&limit=10&page=1&sort=0&by=name&order=name',
      //     headers : {
      //       Authorization : localStorage.getItem('token')
      //     },
      //     data : {
      //         id : 18
      //     }
      // }).then((res)=>{
      //     console.log(res.data)
      //     this.setState({
      //         history : res.data.data
      //     })
      // }).catch((err)=>{
      //     console.log(err)
      // })
  }
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

  handleLogout=()=>{
    // localStorage.clear();
    this.props.logout()
    this.props.history.push('/login')
  }
  handleReturn =(id)=>()=>{
    let data = {
      token : this.props.auth.auth.token
    }
    this.props.returnBook(data,id).then((res)=>{
      console.log(res)
      let data = {
        id : this.props.auth.auth.id,
        token : this.props.auth.auth.token
      }
      this.props.getTransaction(data)
      openNotificationWithIcon('success','Success!!',res.value.data.msg)
    }).catch((err)=>{
      openNotificationWithIcon('error','error',err.response.data.msg)
    })
  }

  getUser = ()=>{
    this.setState({
      user : JSON.parse(localStorage.getItem('userData'))
    })
  }

  componentWillMount(){
    this.getUser()
    this.handleHistory()
  }

  render() {
    const { placement, visible } = this.state;
    const text = <span>History Books</span>;
    const content = (
      <div className={`${Style.popoverContent}`}>
          <div className={`${Style.popoverList}`}>
          {this.props.historyData.history.map((row,index)=>{
            return <p key={index}><BookOutlined style={{paddingRight: '10px'}} onClick={this.handleReturn(row.id)}/>
            {row.title}
            {row.return_date === null?<Badge count={<ClockCircleOutlined style={{ paddingLeft: '10px',color: '#f5222d' }} />}>
            </Badge>: null}
            </p>    
          })}
          </div>
        {/* <p>Content</p> */}
      </div>
    );
    return (
      <>
        <Space>
          <div className="class" onChange={this.showDrawer}>
          <MenuOutlined style={{fontSize: '20px'}} onClick={this.showDrawer}/>
          </div>
        </Space>
        <Drawer
          width={320}
          placement={placement}
          closable={false}
          onClose={this.onClose}
          visible={visible}
          key={placement}
          // maskStyle={{opacity:0,backgroundColor: 'rgba(0, 0, 0, 0.0)'}}
        >
          <div className="menu d-flex justify-content-end align-items-end">
            <button className={`hamburger hamburger--3dx ${this.state.active}`} type="button"
                      aria-label="Menu" aria-controls="navigation" aria-expanded="true" onClick={this.onClose}>
                <span class="hamburger-box">
                  <span class="hamburger-inner"></span>
                </span>
              </button>
          </div>
          <div className="header-profile d-flex flex-column justify-content-center align-items-center">
            <div className="avatar p-3">
            <Avatar size={140} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
            </div>
            <div className={`name m-auto ${Style.name}`}>
              <h5> {this.props.auth.auth.email} </h5>
            </div>
          </div>
          <div className={`d-flex flex-column justify-content-center p-2 pt-4 ${Style.menuList}`}>
          <History data={this.props.historyData.history}/>
          <p onClick={this.handleLogout}>Logout</p>
          </div>
        </Drawer>
      </>
    );
  }
}
const mapStateToProps = state=>({
  auth : state.auth,
  home : state.home,
  historyData : state.history
})
const mapDispatchToProps = {logout,getTransaction,returnBook}
export default connect(mapStateToProps,mapDispatchToProps)(DrawerApp)
