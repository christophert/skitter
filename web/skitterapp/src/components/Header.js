import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Form,
    Navbar,
    Nav,
    NavItem,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';

let cssLoaded = false;
class Header extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    componentDidMount() {
        const userInfo = localStorage.getItem('userInfo');
        if(userInfo) {
            this.setState({userInfo: JSON.parse(userInfo)});
        }  
    }

    render() {
        if(cssLoaded === false) { cssLoaded = true; import ('./Header.css'); }
        let navState = [];
        if(this.state.userInfo) {
            let searchForm = (
                <Form className="form-inline my-2 my-lg-0" key="searchForm">
                    <input className="form-control header-search mr-sm-2 bg-purple" type="search" placeholder="Search" aria-label="Search" />
                </Form>
            )
            navState.push(searchForm);
            let userInd;
            if(this.state.userInfo.firstName != null && this.state.userInfo.lastName != null) {
                userInd = (
                    <span className="navbar-text pr-2" key="userInd">
                        {this.state.userInfo.firstName} {this.state.userInfo.lastName}
                    </span>
                );
            } else {
                userInd = (
                    <span className="navbar-text" key="userInd">
                        {this.state.userInfo.uid}
                    </span>
                );
            }

            let userDropdown = (
                <UncontrolledDropdown nav inNavbar key="navDropdown">
                    <DropdownToggle nav caret>
                       {userInd} 
                    </DropdownToggle>
                    <DropdownMenu right>
                        <Link className="dropdown-item" to="/profile">My Profile</Link>
                        <Link className="dropdown-item" to="/settings">Settings</Link>
                        <DropdownItem divider />
                        <Link className="dropdown-item" to="/logout">Logout</Link>
                    </DropdownMenu>
                </UncontrolledDropdown>
            );
            navState.push(userDropdown);

        } else {
            navState.push((
                <NavItem key="login">
                    <Link to="/login" className="nav-link">Login</Link>
                </NavItem>));
            navState.push((
                <NavItem key="register">
                    <Link to="/register" className="nav-link">Register</Link>
                </NavItem>
            ));
        }
        return (
            <Navbar dark expand="lg" className="bg-purple">
              <NavbarBrand href="/">skitter</NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
               <Nav navbar> 
                  <NavItem>
                    <NavLink active href="/">Home <span className="sr-only">(current)</span></NavLink>
                  </NavItem>
                </Nav>
                <Nav className="ml-auto" navbar> 
                    {navState}
                </Nav>
              </Collapse>
            </Navbar>
        )
    }
}

export default Header
