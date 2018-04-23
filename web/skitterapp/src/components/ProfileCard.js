import React from 'react';
import { Component } from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import {
    Button,
    Card,
    CardTitle,
    CardSubtitle,
    CardBody,
    Col,
    Row } from 'reactstrap';

import ReactImageFallback from "react-image-fallback";

class ProfileCard extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
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
        this.getFollowingData = this.getFollowingData.bind(this);
    }

    componentDidMount() {
        if(this.state.isSelf) {
            this.setState({name: this.state.userInfo.firstName + " " + this.state.userInfo.lastName, username: this.state.userInfo.uid }, function() {
            this.getFollowingData();
        });
        } else {
            let followingList = localStorage.getItem('followingList');
            if(followingList) {
                followingList = JSON.parse(followingList);
                for(var i=0;i<followingList.length;i++) {
                    if(followingList[i].following === this.state.username) {
                        this.setState({isFollowing: true});
                        break;
                    }
                }
            }
            this.getFollowingData();
        }

    }

    getFollowingData() {
        this.setState({isLoading: true});
        const { cookies } = this.props;
        let urlParams = new URLSearchParams();
        urlParams.append("uid", this.state.username);
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
                if(!this.state.isSelf) {
                    for(var i = 0; i < data.length; i++) {
                        if(data[i].following) {
                            this.setState({isFollowing: true});
                            break;
                        }
                    }
                }
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
                credentials: "include",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
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
                let followingList = localStorage.getItem('followingList');
                if(followingList) {
                    followingList = JSON.parse(followingList);
                    followingList.push({following: uid});
                    localStorage.setItem('followingList', JSON.stringify(followingList));
                } else {
                    localStorage.setItem('followingList', JSON.stringify([{following: uid}]));
                }
                this.setState({ isFollowing: true });
            })
            .catch((error) => this.setState({error, isLoading: false}));
        } else {
            //follow false
            let urlParams = new URLSearchParams();
            urlParams.append("follow", uid);
            fetch(`/follows/UnfollowUser?${urlParams.toString()}`, {
                method: 'DELETE',
                credentials: "include",
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
                let followingList = localStorage.getItem('followingList');
                if(followingList) {
                    followingList = JSON.parse(followingList);
                    for(var i = 0; i < followingList.length; i++) {
                        if(followingList[i].following === uid) {
                            followingList.splice(i, 1);
                            break;
                        }
                    }
                    localStorage.setItem('followingList', JSON.stringify(followingList));
                }
                this.setState({ isFollowing: false });
            })
            .catch((error) => this.setState({error, isLoading: false}));
        }
    }

    render() {
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

export default withCookies(ProfileCard)
