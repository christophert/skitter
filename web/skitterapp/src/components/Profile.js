import React from 'react';
import { Component, Fragment } from 'react';
import {
    Row } from 'reactstrap';
import { withCookies } from 'react-cookie';

import Timeline from './Timeline';
import ProfileCard from './ProfileCard';

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

export default withCookies(Profile)

