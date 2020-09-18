import React,{ Component } from 'react';
import Style from '../styles/SideBarStyle.module.css';
import {
    NavbarBrand
} from 'reactstrap';
import {Divider, Drawer} from 'antd';
import DrawerInput from '../components/DrawerInput/DrawerInput'
import {SearchOutlined,LogoutOutlined,MenuOutlined} from '@ant-design/icons';
import { logout } from '../redux/actions/auth' 
import {connect} from 'react-redux';

class SideBar extends Component {
    constructor(props){
        super(props)
        console.log(this.props)
        this.state = {
            navbar : false
        }
    }
    showSide = ()=>{
        this.state.navbar ? this.setState({
            navbar : false
        }) : this.setState({
            navbar : true
        })
    }
    handleOnClick=(url)=>()=>{
        this.props.history.push(`/${url}`)
    }
    handleLogout=()=>{
        // localStorage.clear();
        this.props.logout()
        this.props.history.push('/login')
      }
    render() {
        return (
            <div className={`${Style.sidebar} ${this.state.navbar ? Style.fload : ''}`}>
                <NavbarBrand className={`m-0 pl-4 pt-4 pb-1`}>
                    <h3 className={`${Style.logo}`}>Library App</h3>
                </NavbarBrand>
                <Divider></Divider>
                <div className={`${Style.menuButton}`} onClick={this.showSide}>
                    <div className={`${Style.menuIcon}`}>
                        <MenuOutlined/> <p>Menu</p>
                    </div>
                </div>
                <div className={'d-flex flex-column pr-0 mr-0 pl-2'}>
                    <div className={`p-2 d-flex align-items-start ${Style.menuList} ${this.props.history.location.pathname === '/dashboard'? Style.active : ''}`} onClick={this.handleOnClick('dashboard')}>
                        <p className={`m-0 m-auto`}>List Book</p>
                    </div>
                    <div className={`p-2 d-flex align-items-start ${Style.menuList} ${this.props.history.location.pathname === '/genre'? Style.active : ''}`} onClick={this.handleOnClick('genre')}>
                        <p className={`ml-2 m-auto`}>Manage Genre</p>
                    </div>
                    <div className={`p-2 d-flex align-items-start ${Style.menuList} ${this.props.history.location.pathname === '/author'? Style.active : ''}`} onClick={this.handleOnClick('author')}>
                        <p className={`m-auto  ml-2`}>Mange Author</p>
                    </div>
                    <div className={`p-2 d-flex align-items-start ${Style.menuList} ${this.props.history.location.pathname === '/search'? Style.active : ''}`} onClick={this.handleOnClick('search')}>
                        <p className={`m-auto  ml-2`}><SearchOutlined/>Search</p>
                    </div>
                    <div className={`p-2 d-flex align-items-start ${Style.menuList}`} onClick={this.handleLogout}>
                        <p className={`m-auto  ml-2`}><LogoutOutlined style={{marginRight: '5px'}} />Logout</p>
                    </div>
                </div>
                {
                    this.props.history.location.pathname === '/dashboard'? <DrawerInput/>:null
                }
            </div>
        )
    }
}
const mapStateToProps = (state)=>(
    {
      auth : state.auth
    }
    )
const mapDispatchToProps = {logout}
export default connect(mapStateToProps,mapDispatchToProps)(SideBar)