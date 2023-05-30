import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Row, Col, Alert} from 'react-bootstrap';


function Test() {
    return(
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group className='mb-3'>
            <Form.Label htmlFor='username' className='Text'>Username:</Form.Label>
            <Form.Control
              type='text'
              placeholder='username'
              name='username'
              onChange={handleInputChange}
              value={userFormData.username}
              required
            />
          <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
          </Form.Group>  
          </Form>            
    )

}

export default Test;