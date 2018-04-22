import React from 'react';
import { Component, Fragment } from 'react';
import {
    Button,
    Card,
    CardTitle,
    CardSubtitle,
    CardBody,
    Col,
    Row } from 'reactstrap';

import ReactImageFallback from "react-image-fallback";
import Timeline from './Timeline';

export class ProfileCard extends Component {
    constructor(props) {
        super(props);
        const userInfo = localStorage.getItem('userInfo');
        if(userInfo) {
            let uInfo = JSON.parse(userInfo);
            this.state = { userInfo: uInfo, isFollowing: false, isSelf: props.isSelf, name: props.firstName + " " + props.lastname, username: props.username, followingCount: 0}
        } else {
            this.state = { userInfo: {}, isFollowing: false, isSelf: props.isSelf, name: props.firstName + " " + props.lastname, username: props.username, followingCount: 0 }
        }
        this.changeFollowStatus = this.changeFollowStatus.bind(this);
    }

    componentDidMount() {
        if(this.state.isSelf) {
            this.setState({name: this.state.userInfo.firstName + " " + this.state.userInfo.lastName, username: this.state.userInfo.uid })
        }
    }

    getFollowingData() {
        this.setState({isLoading: true});
        const { cookies } = this.props;
        let urlParams = new URLSearchParams();
        urlParams.append("uid", this.state.username);
        fetch(`/follows/GetFollowers?${urlParams.toString()}`, {
            method: 'GET',
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

    changeFollowStatus(uid, follow) {
        this.setState({isLoading: true});
        const { cookies } = this.props;
        if(follow===true) {
            fetch('/follows/FollowUser', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'X-XSRF-TOKEN': cookies.get('XSRF-TOKEN')
                },
                body: JSON.stringify({
                    follow: uid
                })
            })
            .then(response => {
                if(!response.ok) {
                    throw new Error("Could not follow");
                }
                this.setState({isLoading: false});
                return response.json();
            })
            .then((data) => {
                this.setState({ isFollowing: true });
            })
            .catch((error) => this.setState({error, isLoading: false}));
        } else {
            //follow false
            let urlParams = new URLSearchParams();
            urlParams.append("uid", uid);
            fetch(`/follows/UnfollowUser?${urlParams.toString()}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'X-XSRF-TOKEN': cookies.get('XSRF-TOKEN')
                }
            })
            .then(response => {
                if(!response.ok) {
                    throw new Error("Could not unfollow");
                }
                this.setState({isLoading: false});
                return response.json();
            })
            .then((data) => {
                this.setState({ isFollowing: false });
            })
            .catch((error) => this.setState({error, isLoading: false}));
        }
    }

    render() {
        if(this.state.error) {
            return (<p>There was an error retrieving this profile</p>);
        }
        let followButton = [];
        if (!this.state.isSelf) { //no follow button
            followButton.push(<br key="br" />);
            if(this.state.isFollowing) {
                followButton.push(<Button block color="secondary" key="bun" onClick={() => this.changeFollowStatus(this.state.username, false)}>Unfollow</Button>);
            } else {
                followButton.push(<Button block className="bg-purple" key="bf" onClick={() => this.changeFollowStatus(this.state.username, true)}>Follow</Button>);
            }
        }
        return (
            <div className="col-4">
                <Card className="user-profile-card">

                    <ReactImageFallback src={"/profile_pictures/" + this.state.username + ".jpg"}
                        fallbackImage="//via.placeholder.com/200x100"
                        alt={this.state.username}
                        className="card-img-top user-profile-card-img" />
                        
                    <CardBody>
                        <CardTitle>{this.state.name}</CardTitle>
                        <CardSubtitle>@{this.state.username}</CardSubtitle>
                        <hr/>
                        <Row>
                            <Col xs="12"><small>Following</small><br/>{this.state.followingCount}</Col>
                        </Row>
                        {followButton}
                    </CardBody>
                </Card>
            </div>
        )
    }
}

class Profile extends Component {
    constructor(props) {
        super(props);
        console.log();
        const userInfo = localStorage.getItem('userInfo');
        this.state = { userInfo: JSON.parse(userInfo), username: props.match.params.uid};
    }

    componentDidMount() {
    }


    render() {
        console.log(this.state.username);
        let pcard;
        if(this.state.username) {
            pcard = <ProfileCard username={this.state.username} />
        } else {
            pcard = <ProfileCard isSelf="true" />
        }

        let timeline;
        if(this.state.username) {
            timeline = <Timeline username={this.state.username} />
        } else {
            timeline = <Timeline username={this.state.userInfo.uid} />
        }
        return (
            <Fragment>
                <div className="mb-4"></div>
                <Row>
                    {pcard}
                    <div className="col-8">
                        <h1 className="color-purple">skits</h1>
                        <hr/>
                        {timeline}
                    </div>

                </Row>
            </Fragment>
        )
    }
}

export default Profile

