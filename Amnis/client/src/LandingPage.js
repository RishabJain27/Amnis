import React, { Component } from "react";
import AppNavbar from "./components/AppNavbar";
import { GoogleLogin } from "react-google-login";
import { GoogleLogout } from "react-google-login";
import axios from "axios";
import './App.css';
import logo from "./components/Logo.png";

class LandingPage extends Component {

    constructor(props) {
        super(props);
        document.body.style.backgroundColor = "black";
        document.body.style.webkitTextFillColor = "white";
        //document.body.style.fontSize = '50px';
        document.head.style.fontSize = "100px";
        document.body.style.backgroundSize = "cover";

        this.state = { currentUser: null };
        this.responseGoogle = this.responseGoogle.bind(this);
        this.logoutGoogle = this.logoutGoogle.bind(this);
    }

    responseGoogle = (response) => {
        console.log(response);
        if (response.profileObj) {
            console.log(response.googleId);
            //console.log(response.isSignedIn());
            //console.log(response.getBasicProfile());
            axios
                .get(`http://localhost:5000/api/users/${response.googleId}`) // ` used to insert ID in url
                .then(res => {
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
                            .post("http://localhost:5000/api/users", newUser)
                            .then(res => { console.log(response.profileObj.name + " added!"); })
                            .catch(err => { console.log(err); });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            this.setState({ currentUser: response });
        }
    };

  logoutGoogle = () => {
    console.log("Logged out");
    this.setState({ currentUser: null });
  };

    render() {
        return (
            <div>
                <AppNavbar />
                <center>
                    <div className="logo"><img src={logo} alt="Amnis Logo" width="200" height="200" /></div>
                    <h1>Welcome to Amnis</h1>

                    {this.state.currentUser === null ? (
                        <div>
                            <GoogleLogin
                                clientId="496303468611-kdoi6gtil8qb8f0o807c8f6b69bsiffa.apps.googleusercontent.com"
                                buttonText="Login with Google"
                                render={renderProps => (
                                    <div>
                                        <button onClick={renderProps.onClick}>Student Log in with Google</button>
                                        <br />
                                        <button className="button2" onClick={renderProps.onClick}>Professor Log in with Google</button>
                                    </div>
                                )}
                                onSuccess={this.responseGoogle}
                                onFailure={this.responseGoogle}
                            />
                        </div>
                    ) : (
                            <div>
                                Hello {this.state.currentUser.profileObj.name}! <br />
                                <GoogleLogout
                                    buttonText="Logout"
                                    onLogoutSuccess={this.logoutGoogle}
                                />
                            </div>
                        )}
                    <h1>Created by:</h1>
                    <div>
                        <h1>Nishith, Adit, Shridhik, Rishab, Tejas, and Vishal</h1>
                    </div>
                </center>
            </div>
        );
    }
}

export default LandingPage;
