import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Navbar,
    Nav,
    NavItem,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    NavLink } from 'reactstrap';

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
    render() {
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
                    <NavItem>
                        <Link to="/login" className="nav-link">Login</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/register" className="nav-link">Register</Link>
                    </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
        )
    }
}

export default Header
