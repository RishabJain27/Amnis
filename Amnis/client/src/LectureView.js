// Provides the general React component to be used for viewing an individual
// lecture. If no lecture is found with the given ID, then a 404-esque error 
// page is shown instead.

import React, { Component } from 'react'
import axios from 'axios';

// Component and function imports, as well as CSS
import YoutubeVideo from './components/YoutubeVideo';
import QuestionList from './components/QuestionList';
import AppNavbar from './components/AppNavbar';
import { Button, Table } from 'reactstrap';
import { getUserID } from './UserAuth';
import { serverURL } from './components/ServerRoutes';
import './App.css';

class LectureView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            validURL: false,                     // Boolean to determine whether given URL is valid
            doneLoading: false,                  // Boolean to determine if server has responded with lecture info
            videoID: this.props.match.params.id, // Youtube ID to stream video from
            currentLecture: null,                // Gets the current lecture information from database
            currentID: getUserID()               // Current user's Google ID
        };  

        // Binding functions for user within render()
        this.externalURL = this.externalURL.bind(this);
        this.createButton = this.createButton.bind(this);
        this.stopStream = this.stopStream.bind(this);
    }

    // React defined function, runs whenever component mounts
    componentDidMount() {
        this.updateLecture();
        var intervalID = setInterval(()=> {this.updateLecture()}, 10000); // Allows for updating lecture tags during stream
        this.setState({ intervalID: intervalID });
    }

    // React defined function, runs whenever component is about to unmount
    componentWillUnmount() {
        clearInterval(this.state.intervalID); // Stops updating of lecture
    }

    // Function that updates the lecture tags and info whenever called by sending
    // a GET request to the database.
    updateLecture = () => {
        axios
            .get(`${serverURL}lectures/${this.state.videoID}`) // GET request for current lecture
            .then(res => {
                if(res.data) {
                    this.setState({
                        currentLecture: res.data, 
                        validURL: true,
                        doneLoading: true}); // Updates state based on the given values
                }
            })
            .catch(err => {
                console.log(err);
                this.setState({ doneLoading: true }); // If error occurs, log it
            });
    }

    // Function to create a button that takes in a tag ID and the tag name,
    // produces a button to display the tag and provide an external link relating to it
    createButton = (_id, name) => {
        if(name !== '') {
            return (
                <th key={_id}>
                    <Button onClick={(e) => this.externalURL(e,name)}>
                        <b>{name}</b>
                    </Button>
                </th>);
        }
        return null;
    }

    // Links to a related wikipedia page given a tag name (opens in a new tab)
    externalURL = (event, link) => {
        window.open('https://wikipedia.org/wiki/' + link, '_blank');
    }

    // If the current user is logged in and is the creator of the lecture,
    // this function allows the user to end the stream from showing up as live.
    // Sends a PUT request to the database to do so.
    stopStream = (event) => {
        axios
            .put(`${serverURL}lectures/toggleStream/${this.state.videoID}`)
            .then(res => {
                this.updateLecture();
                this.props.history.push("/lectures"); // Redirects to main lectures page on success
            });
    }

    render() {
        return (
            <div className="landingpage-bg">
                <AppNavbar history={this.props.history} buttonVisible={true} />

                <span style={{ color: 'white' }}>
                    {this.state.doneLoading &&
                        (<div>
                            {this.state.validURL ?
                                (<span>
                                    <h1 className="viewTitle">
                                        {/* The following shows a button for stopping a stream if current user is the lecture creator */}
                                        { this.state.currentLecture.isLive &&
                                          this.state.currentLecture.posterGoogleID === getUserID() &&
                                          (<Button color="danger" onClick={this.stopStream} style={{ marginLeft: '20px', float: 'left' }}>
                                                Stop Streaming
                                            </Button>)
                                        }
                                        <div style={{ textAlign: 'center' }}>{this.state.currentLecture.title}</div>
                                    </h1>

                                    <div className="App">
                                        <div className="video-wrapper">
                                            <YoutubeVideo videoURL={this.state.currentLecture.lectureUrl} />
                                            <div>
                                                {/* Table for tag generation: */}
                                                <Table borderless>
                                                    <thead>
                                                        <tr>
                                                            {this.state.currentLecture.tags.map(({ _id, name }) => this.createButton(_id, name))}
                                                        </tr>
                                                    </thead>
                                                </Table>
                                            </div>
                                        </div>
                                        {/* Discussion board component */}
                                        <div className="discussion-wrapper">
                                            <QuestionList lectureID={this.state.currentLecture._id} />
                                        </div>
                                    </div>
                                </span>) :
                                (<h1 className="redText" style={{height:'485px'}}>
                                    <center>
                                        This is an invalid URL! Click <a href="/lectures/">here</a> to go back.
                                    </center>
                                </h1>)
                            }
                        </div>)}
                </span>
            </div>
        )
    }
}

export default LectureView;