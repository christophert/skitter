import React from 'react';
import { Component, Fragment } from 'react';
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
        let navState = [];
        if(this.state.userInfo) {
            let searchForm = (
                <Form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success my-2 mr-2 my-sm-0" type="submit">Search</button>
                </Form>
            )
            navState.push(searchForm);
            let userInd;
            if(this.state.userInfo.firstName != null && this.state.userInfo.lastName != null) {
                userInd = (
                    <span className="navbar-text">
                        {this.state.userInfo.firstName} {this.state.userInfo.lastName}
                    </span>
                );
            } else {
                userInd = (
                    <span className="navbar-text">
                        {this.state.userInfo.uid}
                    </span>
                );
            }

            navState.push(userInd);
            let userDropdown = (
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                        G
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem>
                            My Profile
                        </DropdownItem>
                        <DropdownItem>
                            Settings
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>
                            Logout
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            );
            navState.push(userDropdown);

        } else {
            navState.push((
                <NavItem>
                    <Link to="/login" className="nav-link">Login</Link>
                </NavItem>));
            navState.push((
                <NavItem>
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
