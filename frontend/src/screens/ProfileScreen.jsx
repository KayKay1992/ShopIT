import { useState, useEffect } from "react"
import {Table, Form, Button, Row, Col} from "react-bootstrap"
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify" 
import { FaTimes } from "react-icons/fa"
import Message from "../Components/Message"
import Loader from "../Components/Loader"
import { useProfileMutation } from "../slices/usersApiSlice"
import { setCredentials } from "../slices/authSlice"
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice"


function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] =useState('');

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, {isLoading: loadingUpdateProfile}] = useProfileMutation();
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
     }
  }, [userInfo, userInfo.name, userInfo.email]);

  const submitHandler =async (e) => {
    e.preventDefault();
  
    if (password!== confirmPassword) {
      toast.error("Passwords do not match");
      
    }else {
      try{
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success("Profile updated successfully");
      }catch(err){
        toast.error(err?.data?.message || err.error);
      }
    }
  };


  return (
    <Row>
      <Col md={3}>
        <h2> User Profile</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="my-2">
            <Form.Label>Name</Form.Label>
            <Form.Control type="name" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="email" className="my-2">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="password" className="my-2">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="confirmPassword" className="my-2">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit" className="my-2">
            Update Profile
          </Button>
          {loadingUpdateProfile && <Loader />}

          </Form>
      </Col>
      <Col md={9}>
      <h2>My Orders</h2>
      {isLoading? <Loader/> : error ? (<Message variant='danger'>
      {error?.data?.message || error.error}
      </Message>) : (
        <Table striped hover responsive="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Order Date</th>
              <th>Total</th>
              <th>paid</th>
              <th>Delivered</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {orders.map((order)=>(
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.createdAt.substring(0, 10)}</td>
              <td>$ {order.totalPrice}</td>
              
              <td>{order.isPaid? (order.paidAt.substring(0, 10)) : (
                <FaTimes style={{color: "red"}}/>
              // 'PAYMENT ON DELIVERY'
              )
              }</td>
              <td>{order.isDelivered? (order.deliveredAt.substring(0, 10)) : (
                <FaTimes style={{color: "red"}}/>
              // 'DELIVERED'
              )
              }</td>
              <td>
                <Nav.Link as={Link} to={`/order/${order._id}`}>
                  <Button variant="info">Details</Button>
                </Nav.Link>
              </td>
            </tr>
          ))}
          </tbody>

        </Table>
      ) }
      </Col>
    </Row>
  )
}

export default ProfileScreen