import React, { Component } from 'react';
import {
  Container,
  Button,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  CardSubtitle,
  Col,
  CardColumns,
  Collapse,
  Form,
  FormGroup,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Tooltip
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getLectures, addLecture } from "./actions/lectureActions";
import PropTypes from "prop-types";
import AppNavbar from "./components/AppNavbar";
import { getUser, getUserID, isUserProfessor } from "./UserAuth";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './App.css';
import { APIkey } from './components/APIkey';



class LecturePage extends Component {

    constructor(props) {
        super(props);
        document.body.style.backgroundColor = 'black';

        this.state = { 
            currentUser: getUser(), 
            isProfessor: isUserProfessor(),
            currentID: getUserID(),
            formOpen: false,
            titleError: false,
            URLError: false,
            duplicateError: false,
            tooltipOpen: false,
            inputTitle: '',
            inputDesc: '',
            inputURL: ''
        };
    }
    componentDidMount() {
        this.props.getLectures();
    }

    formToggle = () => {
        this.setState({ formOpen: !this.state.formOpen });
    }

    tooltipToggle = () => {
        this.setState({ tooltipOpen: !this.state.tooltipOpen });
    }

    checkDuplicateURL = () => {
        return (this.props.lecture.lectures.some(lec => lec.lectureUrl === this.state.inputURL));
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.setState(
            { titleError: this.state.inputTitle === '',
              duplicateError: this.checkDuplicateURL() },
            () => {
                axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${this.state.inputURL}&key=${APIkey}`)
                    .then((res) => {
                        console.log(res.data);
                        this.setState({ URLError: res.data.items.length === 0 },
                            () => {
                                if (!this.state.titleError && !this.state.URLError && !this.state.duplicateError) {
                                    const newLecture = {
                                        title: this.state.inputTitle,
                                        description: this.state.inputDesc,
                                        posterName: this.state.currentUser,
                                        posterGoogleID: this.state.currentID,
                                        lectureUrl: this.state.inputURL,
                                        isLive: res.data.items[0].snippet.liveBroadcastContent === "live"
                                    };
                                    this.props.addLecture(newLecture, this.props.history);
                                }
                            });
                    })
                    .catch((err) => {
                        this.setState({ URLError: true });
                    });

            });
    }

    /*createCards = () => {
        var cards = [];
        let { lectures }  = this.props.lecture; 
        for(let i = 0; i < lectures.length; i++) {
            console.log(i);
            cards.push(<Col> );
        }
    };*/

    printDate = (date) => {
        var dateString = new Date(date);
        dateString = dateString.toLocaleString();
        return <span><b>{dateString}</b></span>;
    }

    redirect = (event, vidID) => {
        window.location.href=`http://localhost:3000/lecture/${vidID}`;
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        const { lectures } = this.props.lecture; 
        return(
            <div className="landingpage-bg">
                <AppNavbar history={this.props.history} buttonVisible={true}/>
                <h1 className="whiteText" style={{paddingTop:'1rem', fontSize:'350%'}}><center><b>Lectures</b></center></h1>
                <Container style={{ marginTop: '1.5rem', marginBottom: '5rem' }}>
                    {this.state.isProfessor && (
                    <Button color="success" onClick={this.formToggle} style={{marginBottom:'1rem'}}>
                        Create a New Lecture&nbsp;
                        {!this.state.formOpen ? (<FontAwesomeIcon icon="plus" />) : ( <FontAwesomeIcon icon="minus" />)}
                    </Button>)}
                    <Collapse isOpen={this.state.formOpen}>
                        <Form style={{marginBottom:'2rem'}} onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="lecturetitle" className="whiteText"><b>Lecture Title:</b></Label>
                                <Input
                                    type="text"
                                    name="inputTitle"
                                    id="lecturetitle"
                                    placeholder="Enter a title"
                                    invalid={this.state.titleError}
                                    onChange={this.onChange} />
                                <FormFeedback invalid><span style={{fontSize:'120%'}}>Please enter a title!</span></FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label for="lectureDesc" className="whiteText"><b>Lecture Description (Optional):</b></Label>
                                <Input
                                    type="textarea"
                                    name="inputDesc"
                                    id="lectureDesc"
                                    placeholder="Add a description"
                                    onChange={this.onChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="lectureURL" className="whiteText"><b>Youtube Video ID:</b></Label>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>https://www.youtube.com/watch?v=</InputGroupText>
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
                    <TransitionGroup className="lecture-list">
                        <CardColumns>
                            {lectures.map(({ _id, title, posterName, description, lectureUrl, dateCreated, isLive }) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
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

LecturePage.propTypes = {
    getLectures: PropTypes.func.isRequired,
    addLecture: PropTypes.func.isRequired,
    lecture: PropTypes.object
};

const mapStateToProps = (state) => ({
    lecture: state.lecture
});

export default connect(
    mapStateToProps, 
    { getLectures,
      addLecture })(LecturePage);