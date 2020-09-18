import React,{ Component } from 'react'
// import DrawerApp from '../components/Drawer'
import { Link, Redirect } from 'react-router-dom'

import {
    Collapse,
    Navbar,
    Nav,
    UncontrolledDropdown,
    DropdownToggle,
    NavItem
} from 'reactstrap';
import Style from '../styles/NavbarStyle.module.css'

class NavbarComponent extends Component {
    constructor(){
        super()
    }

    render() {
        return (
        <Navbar className={`${Style.Navbar} justify-content-center`} light expand="md">
                <Collapse isOpen={true} navbar className={`pl-4`}>
                <Nav className="mr-auto" navbar>
                    <UncontrolledDropdown nav inNavbar>
                    <NavItem>
                        <h4>NavBrand</h4>
                    </NavItem>
                    {/* <DropdownMenu right>
                        <DropdownItem>
                        Option 1
                        </DropdownItem>
                        <DropdownItem>
                        Option 2
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>
                        Reset
                        </DropdownItem>
                    </DropdownMenu> */}
                    </UncontrolledDropdown>
                        <Link className={`btn right-btn ml-2 ${Style.btnInfo} ${Style.fP}`} to='/eventlist'>Event list</Link>
                        <Link className={`btn right-btn ml-2 ${Style.btnInfo} ${Style.fP}`} to='/'>Dashboard</Link>
                    {/* <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                        All Times
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem>
                        Option 1
                        </DropdownItem>
                        <DropdownItem>
                        Option 2
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>
                        Reset
                        </DropdownItem>
                    </DropdownMenu>
                    </UncontrolledDropdown> */}
                </Nav>
                </Collapse>
        </Navbar>
        )
    }
}

export default NavbarComponent