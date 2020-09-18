import React,{ Component } from 'react'
// import DrawerApp from '../components/Drawer'
import { Link, Redirect } from 'react-router-dom'

import {
    Collapse,
    Navbar,
    Nav,
    UncontrolledDropdown,
    DropdownToggle,
    NavItem,
    DropdownItem,
    DropdownMenu,
    NavbarBrand,
    NavbarToggler
} from 'reactstrap';
import Style from '../styles/NavbarStyle.module.css'

class NavbarComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            toggle : false
        }
    }

    toggle = ()=>{
        this.setState({toggle : !this.state.toggle})
    }
    render() {
        return (
        <Navbar className={`${Style.Navbar} justify-content-start align-items-center`} light expand="md">
            <NavbarToggler onClick={this.toggle} />
            <NavbarBrand href="/">
                    <h4 className={'pl-2'}>NavBrand</h4 >
            </NavbarBrand>
                <Collapse isOpen={this.state.toggle} navbar>
                <Nav className="mr-auto" navbar>
                        <Link className={`btn ${Style.btnInfo} ${Style.fP}`} to='/eventlist'>Event list</Link>
                        <Link className={`btn ${Style.btnInfo} ${Style.fP}`} to='/dashboard'>Dashboard</Link>
                        <Link className={`btn ${Style.btnCreate} ${Style.fP}`} to='/'>Create</Link>
                </Nav>
                </Collapse>
        </Navbar>
        )
    }
}

export default NavbarComponent