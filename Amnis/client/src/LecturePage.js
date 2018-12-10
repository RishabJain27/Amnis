// Serves as the main page for logged in users. Shows a list of all
// lectures (current and previous). For professors, there is also an 
// option to create a new lecture, with validation of Youtube video ID.

import React, { Component } from 'react';
import axios from 'axios';

// List of all ReactStrap and other visual imports for UI
import {
  Container,
  Button,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  CardSubtitle,
  CardColumns,
  Collapse,
  Form,
  FormGroup,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

// Redux integration imports
import { connect } from "react-redux";
import { getLectures, addLecture } from "./actions/lectureActions";
import PropTypes from "prop-types";

// React component and function related imports, as well as API keys and CSS
import AppNavbar from "./components/AppNavbar";
import { getUser, getUserID, isUserProfessor } from "./UserAuth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { APIkey } from './components/APIkey';
import { clientURL, youtubeURL, youtubeInfoURL } from './components/ServerRoutes';
import './App.css';

class LecturePage extends Component {

    constructor(props) {
        super(props);
        document.body.style.backgroundColor = 'black';

        this.state = { 
            currentUser: getUser(),         // Gets current signed in user info
            isProfessor: isUserProfessor(), // Gets professor status of current user
            currentID: getUserID(),         // Gets current user Google ID
            formOpen: false,                // Toggles the create lecture form 
            titleError: false,              // Boolean to determine if title is valid
            URLError: false,                // Boolean to determine if Youtube URL is valid
            duplicateError: false,          // Boolean to determine if a duplicate video exists          
            inputTitle: '',                 // Stores form title input
            inputDesc: '',                  // Stores form description input
            inputURL: ''                    // Stores form URL input
        };
    }

    // React defined function that runs when page mounts. In this case, sends
    // a GET request to database for all lectures, through Redux.
    componentDidMount() {
        this.props.getLectures();
    }

    // Toggles the create lecture form visibility
    formToggle = () => {
        this.setState({ formOpen: !this.state.formOpen });
    }

    // Checks for duplicate lectures among all current lectures
    checkDuplicateURL = () => {
        return (this.props.lecture.lectures.some(lec => lec.lectureUrl === this.state.inputURL));
    }

    // Submits a new lecture to be created after performing validation checks (title, duplicate, and valid URL)
    onSubmit = (e) => {
        e.preventDefault();
        this.setState(
            { 
                titleError: this.state.inputTitle === '', // Resetting the field and checking duplicates
                duplicateError: this.checkDuplicateURL() 
            },
            () => { // Callback function to check if given URL is valid, uses Youtube API key
                axios.get(`${youtubeInfoURL}&id=${this.state.inputURL}&key=${APIkey}`)
                    .then((res) => {
                        console.log(res.data); // Sends a GET request, then performs the validation checks
                        this.setState(
                            { 
                                URLError: res.data.items.length === 0 
                            },
                            () => {
                                if (!this.state.titleError && !this.state.URLError && !this.state.duplicateError) {
                                    // If all checks are passed, send a POST request to the database
                                    const newLecture = {
                                        title: this.state.inputTitle,
                                        description: this.state.inputDesc,
                                        posterName: this.state.currentUser,
                                        posterGoogleID: this.state.currentID,
                                        lectureUrl: this.state.inputURL,
                                        isLive: res.data.items[0].snippet.liveBroadcastContent === "live"
                                    };
                                    // Send request through Redux
                                    this.props.addLecture(newLecture, this.props.history); 
                                }
                            });
                    })
                    .catch((err) => {
                        this.setState({ URLError: true }); // Catch a 404 error
                    });
                }
            );
    }

    // Incompleted Row and Column format for lecture viewing cards
    /*createCards = () => {
        var cards = [];
        let { lectures }  = this.props.lecture; 
        for(let i = 0; i < lectures.length; i++) {
            console.log(i);
            cards.push(<Col> );
        }
    };*/

    // Takes an unformatted UTC data as input, returns the formatted and converted time zone string
    printDate = (date) => {
        var dateString = new Date(date);
        dateString = dateString.toLocaleString(); // Convert to locale
        return (<span>
                    <b>{dateString}</b>
                </span>);
    }

    // Redirects the user to the selected lecture
    redirect = (event, vidID) => {
        window.location.href=`${clientURL}lecture/${vidID}`;
    }

    // Changes state to update lecture form fields when edited
    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        const { lectures } = this.props.lecture; // array of all lectures
        return(
            <div className="landingpage-bg">
                <AppNavbar history={this.props.history} buttonVisible={true}/>
                
                <h1 className="whiteText" style={{paddingTop:'1rem', fontSize:'350%'}}>
                    <center>
                        <b>Lectures</b>
                    </center>
                </h1>

                <Container style={{ marginTop: '1.5rem', marginBottom: '5rem' }}>
                    {/* Lecture form for professors */}
                    {this.state.isProfessor &&
                        (<Button color="success" onClick={this.formToggle} style={{ marginBottom: '1rem' }}>
                            Create a New Lecture&nbsp;
                            {!this.state.formOpen ? (<FontAwesomeIcon icon="plus" />) : (<FontAwesomeIcon icon="minus" />)}
                        </Button>)
                    }
                    <Collapse isOpen={this.state.formOpen}> 
                        <Form style={{marginBottom:'2rem'}} onSubmit={this.onSubmit}>
                            {/* Lecture title input (required) */}
                            <FormGroup>
                                <Label for="lecturetitle" className="whiteText">
                                    <b>Lecture Title:</b>
                                </Label>
                                <Input
                                    type="text"
                                    name="inputTitle"
                                    id="lecturetitle"
                                    placeholder="Enter a title"
                                    invalid={this.state.titleError}
                                    onChange={this.onChange} />
                                <FormFeedback invalid><span style={{fontSize:'120%'}}>Please enter a title!</span></FormFeedback>
                            </FormGroup>
                            {/* Lecture description input (optional) */}
                            <FormGroup>
                                <Label for="lectureDesc" className="whiteText">
                                    <b>Lecture Description (Optional):</b>
                                </Label>
                                <Input
                                    type="textarea"
                                    name="inputDesc"
                                    id="lectureDesc"
                                    placeholder="Add a description"
                                    onChange={this.onChange} />
                            </FormGroup>
                            {/* Lecture URL input (required) */}
                            <FormGroup>
                                <Label for="lectureURL" className="whiteText">
                                    <b>Youtube Video ID:</b>
                                </Label>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>{youtubeURL}</InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        type="text"
                                        name="inputURL"
                                        id="lectureURL"
                                        placeholder="Enter your Youtube video ID"
                                        invalid={this.state.URLError || this.state.duplicateError}
                                        onChange={this.onChange} />
                                    <FormFeedback invalid>
                                        <span style={{fontSize:'120%'}}>
                                            {this.state.URLError ? 
                                                ("Please enter a valid Youtube ID!") : ("A lecture with this Youtube ID already exists!")}
                                        </span>
                                    </FormFeedback>
                                </InputGroup>
                                <Button
                                    color="info"
                                    style={{ marginTop: '2rem' }}
                                    block><FontAwesomeIcon icon="video" /> Start Streaming!
                                </Button>
                            </FormGroup>
                        </Form>
                    </Collapse>

                    {/* Displaying list of all lectures */}
                    <TransitionGroup className="lecture-list">
                        <CardColumns>
                            {lectures.map(({ _id, title, posterName, description, lectureUrl, dateCreated, isLive }) => (
                                <CSSTransition key={_id} timeout={500} classNames="fade">
                                    <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                                        {/* Sends a GET request to display the corresponding image thumbnail */}
                                        <CardImg top width="100%" src={`https://img.youtube.com/vi/${lectureUrl}/0.jpg`} alt="Youtube thumbnail" />
                                        <CardBody>
                                            <CardTitle>{title}</CardTitle>
                                            <CardSubtitle>{posterName}</CardSubtitle>
                                            <CardText>{description}</CardText>
                                            {this.printDate(dateCreated)}
                                            <Button 
                                                onClick={(e) => this.redirect(e, _id)} 
                                                color={isLive ? "danger" : "secondary"} 
                                                style={{float:'right'}}> 
                                                {isLive && (<FontAwesomeIcon icon="circle"/>)} View
                                            </Button>
                                        </CardBody>
                                    </Card>
                                </CSSTransition>
                            ))}
                        </CardColumns>   
                    </TransitionGroup>

                </Container>
            </div>
        );
    }
}

// Define the input property types for the LecturePage component
LecturePage.propTypes = {
    getLectures: PropTypes.func.isRequired,
    addLecture: PropTypes.func.isRequired,
    lecture: PropTypes.object
};

// Maps the Redux store state to accessible component properties
const mapStateToProps = (state) => ({
    lecture: state.lecture
});

// Connect this component with Redux lecture functions
export default connect(
    mapStateToProps, 
    { getLectures,
      addLecture })(LecturePage);