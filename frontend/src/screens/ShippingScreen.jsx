import { useState } from "react"
import {Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import FormContainer from "../Components/FormContainer"
import { saveShippingAddress } from "../slices/cartSlice"
import CheckoutSteps from "../Components/CheckoutSteps"

function ShippingScreen() {
    const cart = useSelector((state) => state.cart);
    const {shippingAddress} = cart;

    const [address, setAddress] = useState(shippingAddress?.address || "")
    const [city, setCity] = useState(shippingAddress?.city || "")
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || "")
    const [country, setCountry] = useState(shippingAddress?.country || "")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        // Process form data and send to backend
        dispatch(saveShippingAddress({address, city, postalCode, country}))
        navigate("/payment")  // Redirect to payment screen with new shipping address in the query string
    }

  return (
    <FormContainer>
        <CheckoutSteps step1 step2/>
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId="address" className="my-2">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" placeholder="Enter your address" value={address} onChange={(e) => setAddress(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="city" className="my-2">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" placeholder="Enter your city" value={city} onChange={(e) => setCity(e.target.value)}>

                </Form.Control>
            </Form.Group>
            <Form.Group controlId="postalCode" className="my-2">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control type="text" placeholder="Enter your postal code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="country" className="my-2">
                <Form.Label>Country</Form.Label>
                <Form.Control type="text" placeholder="Enter your country" value={country} onChange={(e) => setCountry(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary" className="my-2">Continue</Button>  {/* Add loading state or error handling here */} 
        </Form>   
    </FormContainer>
  )
}

export default ShippingScreen