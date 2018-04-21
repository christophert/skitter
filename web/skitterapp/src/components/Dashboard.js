import React from 'react';
import { instanceOf } from 'prop-types';
import { Component, Fragment } from 'react';
import { withCookies, CookiesProvider, Cookies } from 'react-cookie';
import {
    Button,
    Card,
    CardImg,
    CardTitle,
    CardSubtitle,
    CardBody,
    Form,
    FormGroup,
    Label,
    Input,
    Media,
    Row } from 'reactstrap';
import { ProfileCard } from './Profile';

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
                        <div className="skits">
                            <Media>
                                <Media left href="#">
                                    <Media object src="//via.placeholder.com/64x64" alt="asdf" className="rounded-circle mr-3" />
                                </Media>
                                <Media body>
                                    <Media heading>
                                        First Last <small className="text-muted">@username</small>
                                    </Media>
                                    Tweet tweet skit skits seet sfasdfkjdfnf ffkkfkfkfkf
                                </Media>
                            </Media>
                        </div>
                    </div>

                </Row>
            </Fragment>
        )
    }
}

export default withCookies(Dashboard)
