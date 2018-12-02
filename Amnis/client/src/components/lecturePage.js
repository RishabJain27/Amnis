import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from "react-redux";
import { getLectures } from '../actions/lectureActions';
import { postLectures } from '../actions/lectureActions';
import PropTypes from 'prop-types';
import './lecturePage.css';


class LecturePage extends Component {
    //uncomment below to integrate 'real-time' question updates

    componentDidMount() {
        this.props.getLectures();
        /*var intervalID = setInterval(()=> {this.props.getQuestions()}, 2000);
        this.setState({intervalID: intervalID});*/
    }

    componentWillUnmount() {
        //clearInterval(this.state.intervalID);
    }
    /*
    onDeleteClick = (id) => {
        this.props.deleteQuestion(id);
    }

    onUpvoteClick = (id) => {
        this.props.upvoteQuestion(id, true); // second variable is true when get request is desired to be resent after upvote
    }*/

    addLectureURL = () => {
        var title =document.getElementById("lectureTitle").value;
        var url =document.getElementById("lectureUrl").value;
        var jsonString = {
            name: title,
            googleUserID: "abc",
            lectureUrl: url
        };/*'{"name": ' + '"' + title  + '"' +  ',"lectureUrl": ' + '"' + url + '"' + "}";
        jsonString = JSON.stringify(jsonString);
        jsonString = JSON.parse(jsonString);*/

        this.props.postLectures(jsonString);
        document.getElementById("lectureTitle").value = "";
        document.getElementById("lectureUrl").value = "";

        //window.alert(jsonString);

    }


    render() {
        const { lectures } = this.props.lecture; 
        //const lectures = [];

        if(true){
        return(
            <Container style={{marginBottom:'5rem'}}>
            <br/>
            <font size="+2"><b>Add New Lecture:</b> </font><br/><br/>
            <div className="add-lecture-wrapper">
             <br/>
            &nbsp; Lecture Title: &nbsp;&nbsp;
            <input type="text" id="lectureTitle" placeholder="e.g Calculus 101 - Introduction to Integrals" size="50"></input>
            <br/><br/>
            &nbsp; Lecture URL: &nbsp;&nbsp;
             <input type="text" id = "lectureUrl"  placeholder="e.g https://www.youtube.com/watch?v=0JUN9aDxVmI" size="50"></input>
             <br/><br/>
                &nbsp;&nbsp;<button id="lecture" onClick={this.addLectureURL}>Add Lecture</button><br/>
            </div><br/>
            <font size="+2"><b>Lectures:</b> </font><br/><br/>
            <div className="add-lecture-wrapper">
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {lectures.map(({ _id, name}) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <span className="name">{name}</span>
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
                </div>
            </Container>
        );
        }
        else{
            return(
            <Container style={{marginBottom:'5rem'}}>
            <div className="add-lecture-wrapper">
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {lectures.map(({ _id, name}) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <span className="name">{name}</span>
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
                </div>
            </Container>
        );
        }
    }


}
LecturePage.propTypes = {
    getLectures: PropTypes.func.isRequired,
    postLectures: PropTypes.func.isRequired,
    lecture: PropTypes.object
}

const mapStateToProps = (state) => ({
    lecture: state.lecture
});

export default connect(
    mapStateToProps, 
    { getLectures, postLectures })(LecturePage);

//export default LecturePage;