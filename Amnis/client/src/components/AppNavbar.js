import React, { Component } from 'react';
import { Button, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container } from 'reactstrap';
import logo from "../images/LogoBorder.png";

class AppNavbar extends Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return(
            <div>
                <Navbar color="secondary" dark expand="sm" className="mb-7">
                    <Container>
                        <NavbarBrand href="/main">
                            <img src={logo} alt="Amnis Logo" width="60" height="50" />
                            <h3 className="red_nav_text"> Amnis</h3></NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink href="/">Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <Button>Help</Button>
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