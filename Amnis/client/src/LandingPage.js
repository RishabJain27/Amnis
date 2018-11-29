import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import { GoogleLogin } from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
import axios from 'axios';

class LandingPage extends Component {
    constructor(props) 
    {
        super(props);
        this.state = {currentUser : null };
        this.responseGoogle = this.responseGoogle.bind(this);
        this.logoutGoogle = this.logoutGoogle.bind(this);
    }

    responseGoogle = (response) => {
        console.log(response);
        if(response.profileObj) 
        {
          console.log(response.googleId);
          //console.log(response.isSignedIn());
          //console.log(response.getBasicProfile());
          axios
            .get(`http://localhost:5000/api/users/${response.googleId}`) // ` used to insert ID in url
            .then(
              (res)=> {
                if(res.data)
                {
                  console.log("Found user!");
                }
                else
                {
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
                    .catch((err) => {console.log(err);});
                }
              }
            )
            .catch((err)=> {console.log(err);});
          this.setState({currentUser : response});
        }
      }
      
    logoutGoogle = () => {
        console.log("Logged out");
        this.setState({currentUser : null});
    }

    render() {
        return(
            <div>
                <AppNavbar />
                <center>
                    <h1>Hello World! This is Amnis Project</h1>
                    {this.state.currentUser === null ? 
                        (<div>
                            <GoogleLogin
                            clientId="496303468611-kdoi6gtil8qb8f0o807c8f6b69bsiffa.apps.googleusercontent.com"
                            buttonText="Login"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            />
                        </div>) : (<div>Hello {this.state.currentUser.profileObj.name}! <br/>
                                        <GoogleLogout
                                        buttonText="Logout"
                                        onLogoutSuccess={this.logoutGoogle}
                                        ></GoogleLogout>
                                    </div>)
                    }
                </center>
            </div>
        );
    }
}

export default LandingPage;