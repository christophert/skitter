import React from 'react';
import { instanceOf } from 'prop-types';
import { Component, Fragment } from 'react';
import {
    Button,
    Col,
    FormGroup,
    Label,
    Input } from 'reactstrap';
import { withCookies, Cookies } from 'react-cookie';

import { ProfileCard } from './Profile';

let cssLoaded = false;
class Settings extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) {
        super(props);

        this.state = { first_name: '', last_name: '', email: '', userInfo: {}, isLoading: false }
    }

    phpSessionCheck() {
        fetch('/settingsapi/SessionCheck.php', {
            method: 'GET',
            credentials: "include",
            headers: {
                'Accept': 'application/json'
            }
        })
        .then((response) => {
            if(!response.ok) {
                throw new Error("PHP session could not be verified");
            }
        })
        .catch((error) => this.setState({error}));
    }

    componentDidMount() {
        this.phpSessionCheck();
        const userInfo = localStorage.getItem('userInfo');
        if(userInfo) {
            this.setState({userInfo: JSON.parse(userInfo)}, function() {
                this.setState({first_name: this.state.userInfo.firstName, last_name: this.state.userInfo.lastName, email: this.state.userInfo.email});
            });
        }  
    }

    handleChange(propertyName, event) {
        let currentState = this.state;
        currentState[propertyName] = event.target.value;
        this.setState(currentState);
    }

    handleSubmit(event) {
        this.setState({isLoading: true});
        const { cookies } = this.props;
        let data = new URLSearchParams();
        data.append("first_name", this.state.first_name);
        data.append("last_name", this.state.last_name);
        data.append("email", this.state.email);

        fetch('/settingsapi/ModifyUser.php', {
            method: 'POST',
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'X-STCSRF-TOKEN': cookies.get('X-STCSRF-TOKEN')
            },
            body: data
            })
            .then(response => {
                if(!response.ok) {
                    throw new Error("Response is not ok");
                }
            })
            .then(() => {
                this.setState({isLoading: false});
                let userInfoClone = JSON.parse(JSON.stringify(this.state.userInfo));
                userInfoClone.firstName = this.state.first_name;
                userInfoClone.lastName = this.state.last_name;
                userInfoClone.email = this.state.email;
                this.setState({userInfo: userInfoClone}, function() {
                    localStorage.setItem('userInfo', JSON.stringify(this.state.userInfo));
                });
            })
            .catch((error) => this.setState({error, isLoading: false}));
        event.preventDefault();
    }

    render() {
        if(cssLoaded === false) { cssLoaded = true; import ('./Settings.css'); }
        return (
            <Fragment>
                <div className="mb-4"></div>
                <div className="row">
                    <ProfileCard/>
                    <div className="col-8">
                        <h1 className="color-purple">settings</h1>
                        <hr/>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <FormGroup row>
                                <Label for="firstName" sm={3}>First Name</Label>
                                <Col sm={9}>
                                    <Input type="text" value={this.state.first_name} onChange={this.handleChange.bind(this, 'first_name')} required />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="lastName" sm={3}>Last Name</Label>
                                <Col sm={9}>
                                    <Input type="text" value={this.state.last_name} onChange={this.handleChange.bind(this, 'last_name')} required />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="email" sm={3}>Email</Label>
                                <Col sm={9}>
                                    <Input type="email" value={this.state.email} onChange={this.handleChange.bind(this, 'email')} required />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="email" sm={3}>File</Label>
                                <Col sm={9}>
                                    <Input type="file" name="profilepic" id="profilepic" />
                                </Col>
                            </FormGroup>
                            <hr/>
                            <FormGroup check row>
                                <Col>
                                    <Button className="bg-purple">Submit</Button>
                                </Col>
                            </FormGroup>
                        </form>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default withCookies(Settings)

