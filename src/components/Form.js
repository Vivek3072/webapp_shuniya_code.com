import React from 'react';

import { Form } from 'react-bootstrap';


const FormContainer = () => {
    return (
        <Form>
            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group controlId="Question.Statement">
                <Form.Label>Question</Form.Label>
                <Form.Control type="text" placeholder="type your question" />
            </Form.Group>
            <Form.Group controlId="Question.Code">
                <Form.Label>Code</Form.Label>
                <Form.Control type="text" placeholder="Code"/>
            </Form.Group>
        </Form>

    )
}

export default FormContainer;