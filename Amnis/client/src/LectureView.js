import React, { Component } from 'react'
import AppNavbar from './components/AppNavbar';
import axios from 'axios';
import YoutubeVideo from './components/YoutubeVideo';
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
                <span style={{color:'white'}}>Hello your attempted ID is: {this.props.match.params.id}
                    {this.state.doneLoading ? 
                        (<div>
                            {this.state.validURL ?
                                (<YoutubeVideo videoURL={this.state.currentLecture.lectureUrl} />) :
                                (<div> This is invalid!</div>)
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