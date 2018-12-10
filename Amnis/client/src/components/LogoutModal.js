// Modal that pops up to indicate that the user has successfully logged out

import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { logoutUser } from '../UserAuth';

class LogoutModal extends Component {
    state = {
        modal: true // Boolean to keep track of modal visibility
    }

    // Toggles the modal visibility state
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        logoutUser();
        return(
            <div>
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