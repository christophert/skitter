import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import {
    Media } from 'reactstrap';
import ReactImageFallback from "react-image-fallback";
let cssLoaded = false;

class Search extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) {
        super(props);
        
        this.state = { term: props.match.params.term, isLoading: false, respData: [] }
    }

    componentDidMount() {
    }

    search() {
        this.setState({isLoading: true});
        const { cookies } = this.props;

        let urlParams = new URLSearchParams();
        urlParams.append('uid', this.state.term);

        fetch(`/follows/UserSearch?${urlParams.toString()}`, {
            method: 'GET',
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': cookies.get('XSRF-TOKEN')
            }
        })
            .then(response => {
                if(!response.ok) {
                    throw new Error("search failed");
                }
                return response.json();
            })
            .then((data) => {
                this.setState({respData: data, isLoading: false });
            })
            .catch((error) => this.setState({error, isLoading: false}));
    }

    render() {
        if(cssLoaded === false) { cssLoaded = true; import ('./Timeline.css'); }
        if(!this.state.term) {
            return (<p>No search term!</p>);
        }

        let searchEntries = this.state.respData.map((user) => {
            return (
                <Media key={user.uid} className="mb-3">
                    <Media left href={"/profile/" + user.uid}>
                        <ReactImageFallback src={"/profile_pictures/" + user.uid + ".jpg"}
                            fallbackImage="//via.placeholder.com/64x64"
                            alt={this.uid}
                            className="skit-profile-img media-object rounded-circle mr-3" />
                    </Media>
                    <Media body>
                        <div className="mt-0">
                            <h2><Link to={"/profile/" + user.uid}>{user.firstName} + " " + {user.lastName}</Link></h2>
                        </div>
                    </Media>
                </Media>
            )})
        return (
            <div className="search-entries">
                {searchEntries}
            </div>
        )
    }
}

export default withCookies(Search)
