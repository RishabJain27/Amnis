import React, { Component } from "react";
import AppNavbar from "./components/AppNavbar";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import './App.css';
import AmnisLogo from "./images/Logo.png";
import GoogleLogoRed from "./images/GoogleRed.png";
import GoogleLogoGrey from "./images/GoogleGrey.png";

class LandingPage extends Component {

    constructor(props) {
        super(props);
        document.body.style.backgroundColor = "black";
        //document.body.style.webkitTextFillColor = "white";
        //document.body.style.fontSize = '50px';
        document.head.style.fontSize = "100px";
        document.body.style.backgroundSize = "cover";

        this.state = { currentUser: null, profClicked: false };
        this.responseGoogle = this.responseGoogle.bind(this);
    }

    responseGoogle = (response) => {
        console.log(response);
        if (response.profileObj) {
            console.log(response.googleId);
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
                            googleUserID: response.googleId,
                            isProfessor: this.state.profClicked
                        };
                        axios
                            .post("http://localhost:5000/api/users", newUser)
                            .then(res => { console.log(response.profileObj.name + " added!"); })
                            .catch(err => { console.log(err); });
                    }
                    localStorage.setItem('currentUser', response.profileObj.name);
                    localStorage.setItem('isProfessor', this.state.profClicked);
                })
                .catch(err => {
                    console.log(err);
                });
            this.setState({ currentUser: response });
        }
    };

    render() {
        const googleIconRed = <img src={GoogleLogoRed} style={{paddingleft:'50%'}} alt="Google Logo" width="80" height="25"/>;
        const googleIconGrey = <img src={GoogleLogoGrey} alt="Google Logo" width="80" height="25"/>;

        return (
            <div>
                <AppNavbar buttonVisible={false}/>
                <center>
                    <div className="logo"><img src={AmnisLogo} alt="Amnis Logo" width="300" height="300" /></div>
                    <h1 className="whiteText">Welcome to Amnis</h1>

                    <div>
                        <GoogleLogin
                            clientId="496303468611-kdoi6gtil8qb8f0o807c8f6b69bsiffa.apps.googleusercontent.com"
                            render={renderProps => (
                                <div>
                                    <button onClick={(e) => { this.setState({ profClicked: false }); renderProps.onClick(e); }}>Student Signup/Login with {googleIconRed}</button>
                                    <br />
                                    <button className="button2" onClick={(e) => { this.setState({ profClicked: true }); renderProps.onClick(e); }}>Professor Signup/Login with {googleIconGrey}</button>
                                </div>
                            )}
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            uxMode='redirect'
                            redirectUri="http://localhost:3000/main"
                        />
                    </div>
                    <h2 className="whiteText" style={{padding:'10px'}}>Created by:<br/>Nishith, Adit, Shridhik, Rishab, Tejas, and Vishal</h2>
                </center>
            </div>
        );
    }
}

export default LandingPage;
