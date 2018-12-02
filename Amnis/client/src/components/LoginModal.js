import React, { Component } from 'react';
import { Modal, ModalHeader, Alert } from 'reactstrap';

class LoginModal extends Component {
    state = {
        modal: true
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return(
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} color="danger">
                    <ModalHeader toggle={this.toggle}>
                        <Alert color="danger">
                            Please create an account or sign in before continuing! 
                        </Alert>
                    </ModalHeader>
                        
                </Modal>
            </div>
        );
    }
}

export default LoginModal;