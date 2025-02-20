import { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../Components/FormContainer";
import Loader from "../Components/Loader";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import {toast} from 'react-toastify'

function RegisterScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, { isLoading }] = useRegisterMutation();

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
        //checking if all fields are filled.
        if(!name ||!email ||!phone ||!password ||!confirmPassword){
            toast.error("All fields are required");
            return;
        }
      //checking for password length.
        if(password.length < 6){
            toast.error("Password must be at least 6 characters long");
            return;
        }
        //checking if passwords match. 
        if(password!== confirmPassword){
            toast.error("Passwords do not match");
            return;
        }else {
               // TODO: Login logic here
      try{
        const res = await register( {name,email,phone, password, confirmPassword}).unwrap();
        dispatch(setCredentials({...res}));
        navigate(redirect);
      }catch(err){
        toast.error(err?.data?.message || err.error);
      }
      
        }
   
    }
  return (
    <FormContainer>
        <h1>Sign Up</h1>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name" className="my-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>
         <Form.Group controlId="email" className="my-3">
           <Form.Label>Email</Form.Label>
           <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
         </Form.Group>
         <Form.Group controlId="phone" className="my-3">
           <Form.Label>Phone No.</Form.Label>
           <Form.Control type="phone" placeholder="Enter phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
         </Form.Group>
         <Form.Group controlId="password" className="my-3">
           <Form.Label>Password</Form.Label>
           <Form.Control type="password" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} />
         </Form.Group>
         <Form.Group controlId="confirmPassword" className="my-3">
           <Form.Label>Confirm Password</Form.Label>
           <Form.Control type="password" placeholder="******" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
         </Form.Group>
         <Button type='submit' variant="primary" className="mt-2" disabled={isLoading}>Register</Button>
         {isLoading && <Loader />}
        </Form>
        <Row className="PY-3">
            <Col>
                <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Already have an account? Sign In</Link>
            </Col>
            {/* <Col className="text-right">
                <Link to="/forgot-password">Forgot Password?</Link>
            </Col> */}
        </Row>
    </FormContainer>
  )
}

export default RegisterScreen