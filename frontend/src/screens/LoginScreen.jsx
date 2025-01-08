import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import {Link} from 'react-router-dom'
import FormContainer from "../Components/FormContainer";

function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Login logic here
        console.log('submit');
      
    }
  return (
    <FormContainer>
        <h1>Sign In</h1>
        <Form onSubmit={handleSubmit}>
         <Form.Group controlId="email" className="my-3">
           <Form.Label>Email</Form.Label>
           <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
         </Form.Group>
         <Form.Group controlId="password" className="my-3">
           <Form.Label>Password</Form.Label>
           <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
         </Form.Group>
         <Button type='submit' variant="primary" className="mt-2">Sign In</Button>
        </Form>
        <Row className="PY-3">
            <Col>
                <Link to="/register">Don't have an account? Sign Up</Link>
            </Col>
            {/* <Col className="text-right">
                <Link to="/forgot-password">Forgot Password?</Link>
            </Col> */}
        </Row>
    </FormContainer>
  )
}

export default LoginScreen