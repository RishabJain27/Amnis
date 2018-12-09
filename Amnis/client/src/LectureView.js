import React, { Component } from 'react'
import AppNavbar from './components/AppNavbar';
import axios from 'axios';
import YoutubeVideo from './components/YoutubeVideo';
import QuestionList from './components/QuestionList';
import ItemModal from './components/ItemModal';
import './App.css';
import { Button, Table } from 'reactstrap';
import { getUserID } from './UserAuth';

class LectureView extends Component {
    constructor(props) {
        super(props);
        document.body.style.backgroundColor = 'black';
        this.state = {
            validURL: false,
            doneLoading: false,
            videoID: this.props.match.params.id,
            currentLecture: null,
            currentID: getUserID()
        };  
        this.externalURL = this.externalURL.bind(this);
        this.createButton = this.createButton.bind(this);
    }

    componentDidMount() {
        this.updateLecture();
        /*var intervalID = setInterval(()=> {this.updateLecture()}, 10000);
        this.setState({intervalID: intervalID});*/
    }

    componentWillUnmount() {
        //clearInterval(this.state.intervalID);
    }

    updateLecture = () => {
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

    externalURL = (event, link) => {
        window.open('https://wikipedia.org/wiki/' + link, '_blank');
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
                                    <h1 className="viewTitle"><center>{this.state.currentLecture.title}</center></h1>
                                    <div className="App">
                                        <div className="video-wrapper">
                                            <YoutubeVideo videoURL={this.state.currentLecture.lectureUrl} />
                                            <div>
                                                <Table borderless>
                                                    <thead>
                                                        <tr>
                                                            {this.state.currentLecture.tags.map(({ _id, name }) => this.createButton(_id, name))}
                                                        </tr>
                                                    </thead>
                                                </Table>
                                            </div>
                                        </div>
                                        <div className="discussion-wrapper"><QuestionList lectureID={this.state.currentLecture._id}/></div>
                                    </div>
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