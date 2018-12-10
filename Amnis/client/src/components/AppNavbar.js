// Main Navbar that shows on all pages throughout the site.

import React, { Component } from "react";
import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Badge
} from "reactstrap";
import AmnisLogo from "../images/LogoBorder.png";
import { isUserLoggedIn, getUser } from '../UserAuth';

class AppNavbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,                              // Boolean to check whether Navbar dropdown is shown 
            buttonVisible: !!this.props.buttonVisible   // Boolean to determine whether Navbar buttons should be visible
        }
    }

    // Toggles the Navbar dropdown
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    // Redirects the user to the main page, and signed them out
    landingRedirect = () => {
        this.props.history.push("/");
    }

    render() {
        let navButton = null;
        let viewLectures = null;
        // Only show buttons if boolean buttonVisible is true
        if(this.state.buttonVisible) {
            navButton = <Button color="info" onClick={this.landingRedirect}>Log Out</Button>;
            viewLectures = <NavLink href="/lectures">View Lectures</NavLink>;
        }

        return(
            <div>
                <Navbar color="secondary" dark expand="sm" className="mb-7" style={{height:'85px'}}>
                    <Container>
                        <NavbarBrand>
                            <img src={AmnisLogo} alt="Amnis Logo" width="80" height="75"/>
                            <h1 className="red_nav_text"> Amnis</h1>
                        </NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                {isUserLoggedIn() && this.state.buttonVisible && 
                                    (<NavItem>
                                        <Badge color="secondary">
                                            <h4 style={{display:'inline'}}>Welcome, {getUser()}!</h4>&nbsp;
                                        </Badge>
                                    </NavItem>)
                                }
                                <NavItem>
                                    {viewLectures}
                                </NavItem>
                                <NavItem>
                                    {navButton}
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

export default AppNavbar;