// Landing page React component that serves as the main homepage.
// User is able to sign in as a student or professor using Google Login
// through OAuth 2.0. Returning to this page will sign you out if you are 
// already signed in.

import React, { Component } from "react";
import axios from "axios";
import { GoogleLogin } from "react-google-login";

// React component and function related imports
import AppNavbar from "./components/AppNavbar";
import LogoutModal from "./components/LogoutModal";
import LoginModal from "./components/LoginModal";
import { GoogleClientID } from './components/APIkey';
import { serverURL } from './components/ServerRoutes';
import { isUserLoggedIn } from './UserAuth';

// Images and CSS
import AmnisLogo from "./images/Logo.png";
import GoogleLogoRed from "./images/GoogleRed.png";
import GoogleLogoGrey from "./images/GoogleGrey.png";
import './App.css';

class LandingPage extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            currentUser: null,          // Stores the current signed in user
            profClicked: false,         // Boolean to see if user chose to sign in as professor
            loggedOut: isUserLoggedIn() // Check if user is logged in when entering this page
        };

        // Binding functions for use within render()
        this.responseGoogle = this.responseGoogle.bind(this);
        this.resetRedirect = this.resetRedirect.bind(this);
    }

    // Callback function to execute after user attempts to login through Google account
    responseGoogle = (response) => {
        if (response.profileObj) {
            // Sends a GET request to check whether user is already stored in database
            axios
                .get(`${serverURL}users/${response.googleId}`) // Back-ticks ` used to insert ID in url
                .then(res => {
                    if(!res.data) {
                        const newUser = {
                            name: response.profileObj.name,
                            googleUserID: response.googleId,
                            isProfessor: this.state.profClicked
                        };
                        // If no user found, add the given user
                        axios
                            .post(`${serverURL}users`, newUser)
                            .then(res => { console.log(response.profileObj.name + " added!"); })
                            .catch(err => { console.log(err); });
                    }
                    // Locally set the information in the browser in order to minimize calls to the database
                    localStorage.setItem('currentUser', response.profileObj.name);
                    localStorage.setItem('currentGoogleID', response.googleId);
                    localStorage.setItem('isProfessor', this.state.profClicked);
                    this.props.history.push('/lectures'); // Redirect to lecture page on completion
                })
                .catch(err => {
                    console.log(err);
                });
            this.setState({ currentUser: response }); // Sets the component state with the given Google response
        }
    }

    // Clears the login modal popup after one time
    resetRedirect = () => {
        localStorage.removeItem('popup');
    }

    render() {
        // Google icon images
        const googleIconRed = <img src={GoogleLogoRed} style={{paddingleft:'50%'}} alt="Google Logo" width="80" height="25"/>;
        const googleIconGrey = <img src={GoogleLogoGrey} alt="Google Logo" width="80" height="25"/>;

        return (
            <div className="landingpage-bg">
                <AppNavbar buttonVisible={false}/>

                {/* Display modal to indicate user needs to sign in to continue */}
                {localStorage.getItem('popup') && <LoginModal />} 
                {this.resetRedirect()}

                {/* Display logged out modal if user was signed out */}
                {this.state.loggedOut && <LogoutModal />}

                {/* Main landing page JSX */}
                <center>
                    <div className="logo"><img src={AmnisLogo} alt="Amnis Logo" width="300" height="300" /></div>
                    <h1 className="whiteText">
                        Welcome to Amnis!
                    </h1>

                    <div>
                        {/* Google Login component, uses OAuth 2.0 and ucsc.edu as a hosted domain */}
                        <GoogleLogin
                            clientId={GoogleClientID}
                            render={renderProps => (
                                <div>
                                    <button onClick={(e) => { 
                                            this.setState({ profClicked: false }); 
                                            renderProps.onClick(e); 
                                        }}>
                                        Student Signup/Login with {googleIconRed}
                                    </button>
                                    <br />
                                    <button className="button2" onClick={(e) => { 
                                            this.setState({ profClicked: true }); 
                                            renderProps.onClick(e); }}>
                                            Professor Signup/Login with {googleIconGrey}
                                    </button>
                                </div>
                            )}
                            hostedDomain="ucsc.edu" 
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                        />
                    </div>

                    <h2 className="whiteText" style={{padding:'10px'}}>
                        Created by:<br/>Nishith, Adit, Shridhik, Rishab, Tejas, and Vishal
                    </h2>
                </center>
            </div>
        );
    }
}

export default LandingPage;
