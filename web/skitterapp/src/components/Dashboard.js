import React from 'react';
import { instanceOf } from 'prop-types';
import { Component, Fragment } from 'react';
import { withCookies, Cookies } from 'react-cookie';
import {
    Button,
    Form,
    FormGroup,
    Input,
    Media,
    Row } from 'reactstrap';
import { ProfileCard } from './Profile';
import Timeline from './Timeline';

class Dashboard extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) {
        super(props);
        this.state = { msg: '', isLoading: false };
    }

    handleChange(propertyName, event) {
        let currentState = this.state;
        currentState[propertyName] = event.target.value;
        this.setState(currentState);
    }

    handleSubmit(event) {
        this.setState({isLoading: true});
        const { cookies } = this.props;

        fetch('/skits/AddSkit', {
            method: 'POST',
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': cookies.get('XSRF-TOKEN')
            },
            body: JSON.stringify({
                msg: this.state.msg
            }) 
        })
            .then(response => {
                if(!response.ok) {
                    throw new Error("Response is not ok");
                }
            })
            .then(() => this.setState({isLoading: false, msg: '' }))
            .catch((error) => this.setState({error, isLoading: false}));
        event.preventDefault();
    }

    render() {
        return (
            <Fragment>
                <div className="mb-4"></div>
                <Row>
                    <ProfileCard isSelf="true" />
                    <div className="col-8">
                        <Media>
                            <Media left href="/profile">
                                <Media object src="//via.placeholder.com/64x64" alt="self profile" className="rounded-circle mr-3" />
                            </Media>
                            <Media body>
                                <Form onSubmit={this.handleSubmit.bind(this)}>
                                    <FormGroup>
                                        <Input type="textarea" name="msg" id="msg" value={this.state.msg} onChange={this.handleChange.bind(this, 'msg')} maxLength="140" required autoFocus />
                                    </FormGroup>
                                    <FormGroup>
                                        <Button type="Submit" className="float-right bg-purple">Post</Button>
                                    </FormGroup>
                                </Form>
                            </Media>
                        </Media>
                        <hr/>
                        <Timeline username="ctt1414" />
                    </div>

                </Row>
            </Fragment>
        )
    }
}

export default withCookies(Dashboard)
