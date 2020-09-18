import React,{ Component } from 'react';
import Style from './NavBarLandingStyle.module.css';
import Drawer from '../Drawer'
import {
    HomeOutlined,
    SearchOutlined,
    MenuOutlined
  } from '@ant-design/icons';
import History from '../../components/History'

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
  } from 'reactstrap';

export default class NavBarLanding extends Component {
    constructor(props){
        super(props)
        this.state = {
            isOpen : false
        }
    }
    toggle = ()=>{
        if (this.state.isOpen == false) {
            this.setState({
                isOpen : true
            })
        }
        else{
            this.setState({
                isOpen : false
            })
        }
    }
    onClickSearch= ()=>{
        this.props.history.history.push('/search')
    }
    render() {
        return (
            <div style={{backgroundColor:'white'}}>
            <Navbar light expand="md" className={`${Style.Navbar}`}>
                <NavbarBrand>Library App</NavbarBrand>
                {/* <NavbarToggler onClick={this.toggle} /> */}
                <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="mr-auto" navbar>
                </Nav>
                </Collapse>
                <div className='d-flex flex-row justify-content-center align-items-center'>
                    <div className={`${Style.search}`} onClick={this.onClickSearch}>
                    <SearchOutlined style={{fontSize: '20px'}} />
                    </div>
                    <div className={`${Style.menu}`}>
                        <Drawer history={this.props.history.history}/>
                    </div>
                </div>
            </Navbar>
            </div>
        )
    }
} 