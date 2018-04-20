import React from 'react';
import { Component, Fragment } from 'react';
import {
    Card,
    CardImg,
    CardTitle,
    CardSubtitle,
    CardBody,
    Media,
    Row } from 'reactstrap';
import { ProfileCard } from './Profile';

class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <div className="mb-4"></div>
                <Row>
                    <ProfileCard isSelf="true" />
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

export default Dashboard
