import React from 'react';
import { instanceOf } from 'prop-types';
import { Component } from 'react';
import { withCookies, Cookies } from 'react-cookie';
import { Media } from 'reactstrap';
import ReactImageFallback from "react-image-fallback";
let cssLoaded = false;

class Timeline extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) {
        super(props);
        console.log("hi mom");
        console.log(arguments);
        console.log(JSON.stringify(props));
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
                this.setState({isLoading: false});
                return response.json();
            })
            .then((data) => {
                this.setState({timelineData: data.hits.hits, isLoading: false});
            })
            .catch((error) => this.setState({error, isLoading: false}));
    }

    render() {
        if(cssLoaded === false) { cssLoaded = true; import ('./Timeline.css'); }
        console.log(this.state);
        let skits = this.state.timelineData.map((skit) => {
            return (
                <Media key={skit._id} className="mb-3">
                    <Media left href="#">
                        <ReactImageFallback src={"/profile_pictures/" + this.state.user + ".jpg"}
                            fallbackImage="//via.placeholder.com/64x64"
                            alt={this.state.user}
                            className="skit-profile-img media-object rounded-circle mr-3" />
                    </Media>
                    <Media body>
                        <div className="mt-0">
                            <small className="text-muted"><b>{skit._source.name}</b> @{skit._index} • {skit._source.date}</small>
                        </div>
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
