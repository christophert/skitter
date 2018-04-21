import React from 'react';
import { instanceOf } from 'prop-types';
import { Component, Fragment } from 'react';
import { withCookies, CookiesProvider, Cookies } from 'react-cookie';
import {
    Media,
    Row } from 'reactstrap';
import _ from 'lodash';

class Timeline extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) {
        super(props);
        this.state = { timelineData: [], isLoading: false, user: props.username };
        this.getTimelineData = this.getTimelineData.bind(this);
    }

    componentDidMount() {
        this.getTimelineData();
    }

    getTimelineData() {
        this.setState({isLoading: true});
        const { cookies } = this.props;

        let urlParams = new URLSearchParams();
        urlParams.append("id", this.state.user);

        fetch(`/skits/GetSkits?${urlParams.toString()}`, {
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
                this.setState({timelineData: response.hits.hits, isLoading: false});
            })
            .catch((error) => this.setState({error, isLoading: false}));
    }

    render() {
        let skits = this.state.timelineData.map((skit) => {
            return (
                <Media key={skit._id}>
                    <Media left href="#">
                        <Media object src="//via.placeholder.com/64x64" alt="Profile picture" className="rounded-curcle mr-3" />
                    </Media>
                    <Media body>
                        <Media heading>
                            <small className="text-muted"><b>{skit._source.name}</b> @{skit._index} • {skit._source.date}</small>
                        </Media>
                        {skit._source.msg}
                    </Media>
                </Media>
            )
        });
        return (
            <div className="skits">
                {skits}
            </div>
        );
    }
}

export default withCookies(Timeline)
