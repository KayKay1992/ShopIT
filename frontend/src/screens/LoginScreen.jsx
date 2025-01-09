import { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../Components/FormContainer";
import Loader from "../Components/Loader";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import {toast} from 'react-toastify'

function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();

    //getting our userInfo from authState
    const {userInfo} = useSelector(state => state.auth);

    //checking if redirect to shipping screen condition is there otherwise navigate to homePage.
    const {search} = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    //using useEffect to check if a user has logged in then redirect the user.
    useEffect(() => {
        if(userInfo) {
            navigate(redirect);
        }
    }, [userInfo, navigate, redirect])

    //submitting the form data to the login mutation.
    const handleSubmit = async (e) => {
        e.preventDefault();
        // TODO: Login logic here
      try{
        const res = await login( {email, password}).unwrap();
        dispatch(setCredentials({...res}));
        navigate(redirect);
      }catch(err){
        toast.error(err?.data?.message || err.error);
      }
      
    }
  return (
    <FormContainer>
        <h1>Sign In</h1>
        <Form onSubmit={handleSubmit}>
         <Form.Group controlId="email" className="my-3">
           <Form.Label>Email</Form.Label>
           <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
         </Form.Group>
         <Form.Group controlId="password" className="my-3">
           <Form.Label>Password</Form.Label>
           <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
         </Form.Group>
         <Button type='submit' variant="primary" className="mt-2" disabled={isLoading}>Sign In</Button>
         {isLoading && <Loader />}
        </Form>
        <Row className="PY-3">
            <Col>
                <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Don't have an account? Sign Up</Link>
            </Col>
            {/* <Col className="text-right">
                <Link to="/forgot-password">Forgot Password?</Link>
            </Col> */}
        </Row>
    </FormContainer>
  )
}

export default LoginScreen