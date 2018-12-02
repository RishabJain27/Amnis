import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { logoutUser } from '../UserAuth';

class LogoutModal extends Component {
    state = {
        modal: true
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        logoutUser();
        return(
            <div>
                <Button
                    color="dark"
                    style={{marginBottom: '2rem'}}
                    onClick={this.toggle}
                >Sign Out</Button>

                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}><center>You have been signed out.</center></ModalHeader>
                    <ModalBody>
                        Thanks for trying out Amnis!
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default LogoutModal;