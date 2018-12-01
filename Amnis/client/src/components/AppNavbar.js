import React, { Component } from 'react';
import { Button, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container } from 'reactstrap';
import logo from "../images/LogoBorder.png";

class AppNavbar extends Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            isOpen: false,
            buttonVisible: !!this.props.buttonVisible
        }
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        let navButton = null;
        if(this.state.buttonVisible) {
            navButton = <Button outline color="info">Help</Button>
        }

        return(
            <div>
                <Navbar color="secondary" dark expand="sm" className="mb-7">
                    <Container>
                        <NavbarBrand href="/">
                            <img src={logo} alt="Amnis Logo" width="70" height="60" />
                            <h1 className="red_nav_text"> Amnis</h1></NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink href="/main">View Lectures</NavLink>
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