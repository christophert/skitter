import React from 'react';
import { Component } from 'react';
import {
    Button,
    Card,
    CardImg,
    CardBody,
    CardTitle,
    CardSubtitle,
    Col,
    Form,
    FormGroup,
    Label,
    Input } from 'reactstrap';

import { ProfileCard } from './Profile';

let cssLoaded = false;
class Settings extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if(cssLoaded === false) { cssLoaded = true; import ('./Settings.css'); }
        return (
            <div className="row">
                <ProfileCard/>
                <div className="col-8">
                    <h1 className="color-purple">settings</h1>
                    <hr/>
                    <Form>
                        <FormGroup row>
                            <Label for="firstName" sm={3}>First Name</Label>
                            <Col sm={9}>
                                <Input type="text" name="firstName" id="firstName" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="lastName" sm={3}>Last Name</Label>
                            <Col sm={9}>
                                <Input type="text" name="lastName" id="lastName" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="email" sm={3}>Email</Label>
                            <Col sm={9}>
                                <Input type="email" name="email" id="email" />
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
                    </Form>
                </div>
            </div>
        )
    }
}

export default Settings

