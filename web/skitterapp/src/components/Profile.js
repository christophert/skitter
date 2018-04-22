import React from 'react';
import { Component, Fragment } from 'react';
import {
    Button,
    Card,
    CardImg,
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
            this.state = { userInfo: uInfo, isFollowing: false, isSelf: props.isSelf, name: props.firstName + " " + props.lastname, username: props.username }
        } else {
            this.state = { userInfo: {}, isFollowing: false, isSelf: props.isSelf, name: props.firstName + " " + props.lastname, username: props.username }
        }
    }

    componentDidMount() {
        if(this.state.isSelf) {
            this.setState({name: this.state.userInfo.firstName + " " + this.state.userInfo.lastName, username: this.state.userInfo.uid })
        }
    }



    render() {
        let followButton = [];
        if (!this.state.isSelf) { //no follow button
            followButton.push(<br key="br" />);
            if(this.state.isFollowing) {
                followButton.push(<Button block color="secondary" key="bun">Unfollow</Button>);
            } else {
                followButton.push(<Button block className="bg-purple" key="bf">Follow</Button>);
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
                            <Col xs="4" className="border border-top-0 border-bottom-0 border-left-0"><small>Skits</small><br/>123</Col>
                            <Col xs="4" className="border border-top-0 border-bottom-0 border-left-0"><small>Followers</small><br/>123</Col>
                            <Col xs="4"><small>Following</small><br/>123</Col>
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

