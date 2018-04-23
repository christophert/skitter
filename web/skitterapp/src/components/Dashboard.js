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
import ProfileCard from './ProfileCard';
import Timeline from './Timeline';
import ReactImageFallback from "react-image-fallback";

let cssLoaded = false;
class Dashboard extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) {
        super(props);
        this.state = { msg: '', isLoading: false, userInfo: {}, firstName: '', lastName: '', uid: ''};
        const userInfo = localStorage.getItem('userInfo');
        if(userInfo) {
            this.setState({userInfo:JSON.parse(userInfo)});
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    didComponentMount() {
        this.setState({uid: this.state.userInfo.uid, firstName: this.state.userInfo.firstName, lastName: this.state.userInfo.lastName}, function() {
        this.getFollowing();
    });

    }

    handleChange(propertyName, event) {
        let currentState = this.state;
        currentState[propertyName] = event.target.value;
        this.setState(currentState);
    }

    getFollowing() {
        this.setState({isLoading: true});
        const { cookies } = this.props;
        let urlParams = new URLSearchParams();
        urlParams.append("uid", this.state.uid);
        fetch(`/follows/GetFollowers?${urlParams.toString()}`, {
            method: 'GET',
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'X-XSRF-TOKEN': cookies.get('XSRF-TOKEN')
            }
        })
            .then(response => {
                if(!response.ok) {
                    throw new Error("Response is not OK");
                }
                this.setState({isLoading: false});
                return response.json();
            })
            .then((data) => {
                this.setState({following: data, followingCount: data.length, isLoading: false });
            })
            .catch((error) => this.setState({error, isLoading: false}));
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
        if(cssLoaded === false) { cssLoaded = true; import ('./Timeline.css'); }
        return (
            <Fragment>
                <div className="mb-4"></div>
                <Row>
                    <ProfileCard isSelf="true" />
                    <div className="col-8">
                        <Media>
                            <Media left href="/profile">
                                <ReactImageFallback src={"/profile_pictures/" + this.state.uid + ".jpg"}
                                    fallbackImage="//via.placeholder.com/64x64"
                                    alt={this.state.user}
                                    className="skit-profile-img media-object rounded-circle mr-3" />
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
                        <Timeline username={this.state.uid} following={this.state.following} />
                    </div>

                </Row>
            </Fragment>
        )
    }
}

export default withCookies(Dashboard)
