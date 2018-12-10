// Our old lecture component, serves as a framework for pages

import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import AppNavbar from './components/AppNavbar';
import QuestionList from './components/QuestionList';
import ItemModal from './components/ItemModal';
import { Container } from 'reactstrap';
import { GoogleLogin } from 'react-google-login';
import { Button } from 'reactstrap';
import YoutubeVideo from './components/YoutubeVideo';


// Redux related imports: 
//import { Provider } from 'react-redux';
//import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        document.body.style.backgroundColor = 'black';
        this.state = { 
            currentUser: localStorage.getItem('currentUser'), 
            isProfessor: !!localStorage.getItem('isProfessor')
        };

        this.isUserLoggedIn = this.isUserLoggedIn.bind(this);
        this.responseGoogle = this.responseGoogle.bind(this);
        this.logoutGoogle = this.logoutGoogle.bind(this);
    }

    isUserLoggedIn = () => {
        return (this.state.currentUser !== null);
    }

  responseGoogle = (response) => {
    console.log(response);
    if(response.profileObj) 
    {
      console.log(response.googleId);
      axios
        .get(`http://localhost:5000/api/users/${response.googleId}`) // ` used to insert ID in url
        .then(
          (res) => {
              if (res.data) {
                  console.log("Found user!");
              }
              else {
                  console.log("No users found");
                  const newUser = {
                      name: response.profileObj.name,
                      googleUserID: response.googleId
                  };
                  axios
                      .post('http://localhost:5000/api/users', newUser)
                      .then((res) => {
                          console.log(response.profileObj.name + " added!");
                      })
                      .catch((err) => { console.log(err); });
              }
              localStorage.setItem('currentUser', response.profileObj.name);
          }
        )
        .catch((err)=> {console.log(err);});
      this.setState({currentUser : response.profileObj.name});
    }
  }
  
  logoutGoogle = () => {
    console.log("Logged out " + this.state.currentUser);
    localStorage.clear();
    this.setState({currentUser : null});
  }
  
  render() {
    return (
        <div className="landingpage-bg">
          <AppNavbar history={this.props.history} buttonVisible={true}/>
          <Container>
            {(!this.isUserLoggedIn()) ? 
              (<div>
                <GoogleLogin
                  clientId="496303468611-kdoi6gtil8qb8f0o807c8f6b69bsiffa.apps.googleusercontent.com"
                  buttonText="Login"
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
                />
              </div>) : (<div className="whiteText">Hello {this.state.currentUser}! <br/>
                            <Button color="info" onClick={this.logoutGoogle}>Logout</Button>
                        </div>)
            }
            <ItemModal />
            <div className="App">
              <div className="video-wrapper"><YoutubeVideo videoURL="V2Afni3S-ok"/></div>
              <div className="discussion-wrapper"><QuestionList /></div>
            </div>
          </Container>
        </div>
    );
  }
}

export default App;
