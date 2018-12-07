import React, { Component } from 'react'
import AppNavbar from './components/AppNavbar';
import axios from 'axios';
import YoutubeVideo from './components/YoutubeVideo';
import './App.css';
// import { connect } from "react-redux";
//import PropTypes from "prop-types";
//import { checkLecture } from "./actions/lectureActions";

class LectureView extends Component {
    constructor(props) {
        super(props);
        document.body.style.backgroundColor = 'black';
        this.state = {
            validURL: false,
            doneLoading: false,
            videoID: this.props.match.params.id,
            currentLecture: null
        };  
    }

    componentDidMount() {
        axios
            .get(`http://localhost:5000/api/lectures/${this.state.videoID}`)
            .then(res => {
                if(res.data) {
                    this.setState({
                        currentLecture: res.data, 
                        validURL: true,
                        doneLoading: true});
                }
            })
            .catch(err => {
                console.log(err);
                this.setState({doneLoading: true});
            });
    }

    render() {
        return (
            <div>
                <AppNavbar history={this.props.history} buttonVisible={true} />
                <span style={{color:'white'}}>
                    {this.state.doneLoading ? 
                        (<div>
                            {this.state.validURL ?
                                (<span>
                                    <h1><center>{this.state.currentLecture.title}</center></h1>
                                    <YoutubeVideo videoURL={this.state.currentLecture.lectureUrl} />
                                </span>) :
                                (<h1 className="redText"><center>This is an invalid URL! Click <a href="/lectures/">here</a> to go back.</center></h1>)
                            }
                        </div>)
                        : null
                    } 
                </span>
            </div>
        )
    }
}

export default LectureView;
/*LectureView.propTypes = {
    checkLecture: PropTypes.func.isRequired,
    lecture: PropTypes.object
};

const mapStateToProps = (state) => ({
    lecture: state.lecture
});

export default connect(
    mapStateToProps, 
    { checkLecture })(LectureView);*/