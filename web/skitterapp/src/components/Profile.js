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
    Media,
    Row } from 'reactstrap';

export class ProfileCard extends Component {
    constructor(props) {
        super(props);
        this.state = { isFollowing: false, isSelf: props.isSelf }
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
                    <CardImg top src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2275%22%20height%3D%2275%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2075%2075%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_162e0ca3075%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_162e0ca3075%22%3E%3Crect%20width%3D%2275%22%20height%3D%2275%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2219.7890625%22%20y%3D%2242.0046875%22%3E75x75%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" className="card-img-top user-profile-card-img"/>
                    <CardBody>
                        <CardTitle>First Last</CardTitle>
                        <CardSubtitle>@username</CardSubtitle>
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
    }

    render() {
        return (
            <Fragment>
                <div className="mb-4"></div>
                <Row>
                    <ProfileCard/>
                    <div className="col-8">
                        <h1 className="color-purple">skits</h1>
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

export default Profile

