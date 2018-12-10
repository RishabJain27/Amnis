// Previous framework modal for adding a question

import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addQuestion, getQuestions } from '../actions/questionActions';

class ItemModal extends Component {
    state = {
        modal: false,
        name: '',
        score: 0
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = (e) => {
        var value = (e.target.type === 'number' ? parseInt(e.target.value) : e.target.value);
        if(e.target.type === 'number' && isNaN(value))
        {
            console.log("undefined!");
            value = 0;
        }
        this.setState({ [e.target.name]: value });
    }

    onSubmit = (e) => {
       e.preventDefault();

       const newQuestion = {
            content: this.state.name,
            score: this.state.score
       };

       this.props.addQuestion(newQuestion);
       this.toggle();
    }

    render() {
        return(
            <div>
                <Button
                    color="dark"
                    style={{marginBottom: '2rem'}}
                    onClick={this.toggle}
                >Add Question</Button>

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Add to Discussion Board</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="question">Question</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="question"
                                    placeholder="Add question"
                                    onChange={this.onChange} />
                                 <Input
                                    type="number"
                                    name="score"
                                    id="questionScore"
                                    value={this.state.score}
                                    min="0"
                                    placeholder="Add score"
                                    onChange={this.onChange} />
                                <Button 
                                    color="dark"
                                    style={{marginTop: '2rem'}}
                                    block>Add</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    question: state.question
});

export default connect(mapStateToProps, { addQuestion, getQuestions })(ItemModal);