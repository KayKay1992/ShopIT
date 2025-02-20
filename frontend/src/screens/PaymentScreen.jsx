import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate} from "react-router-dom"
import {Form, Button, Col  } from 'react-bootstrap'
import  FormContainer from '../Components/FormContainer'
import CheckoutSteps from '../Components/CheckoutSteps'
import { savePaymentMethod } from "../slices/cartSlice"


function PaymentScreen() {
    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    useEffect(() => {
        if (!shippingAddress) {
            navigate("/shipping")
        }
    }, [shippingAddress, navigate])
    
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate("/placeorder")  // Redirect to PlaceOrder Screen
    }
  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3/>
        <Form onSubmit={submitHandler}>
            <Form.Group as={Col} controlId="paymentMethod" className="my-2">
                <Form.Label>Payment Method: Please Choose Payment on Delivery</Form.Label>
                <Form.Control as="select" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                    <option value="PayPal">PayPal</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Payment on Delivery">Payment on Delivery</option>
                </Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary">
                Proceed to Checkout
            </Button>
            {/* <Form.Group>
              <Form.Label>Choose your payment method:</Form.Label>
              <Col>
              <Form.Check
                type="radio"
                label="PayPal or Credit Card"
                className="my-2"
                name="paymentMethod"
                id="paypal"
                value="PayPal"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
              </Col>
            </Form.Group>
            <Button type="submit" variant="primary">
                Proceed to Checkout
            </Button> */}
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen