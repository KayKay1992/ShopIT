import {Nav} from 'react-bootstrap'



function CheckoutSteps({step1, step2, step3, step4, }) {
  return (
    <Nav className='justify-content-center mb-4'>
        <Nav.Item>
            {step1 ? (
                <a href='/login'  >
                    <div className='py-2 px-4 '>Sign In</div>
                </a>
            ) : (
                <Nav.Link disabled>Sign In</Nav.Link>  
            )} {''}
        </Nav.Item>
        <Nav.Item>
            {step2 ? (
               <a href='/shipping'>
                    <div className='py-2 px-4 '>Shipping</div>
                </a>
            ) : (
                <Nav.Link disabled>Shipping</Nav.Link>
            )}
        </Nav.Item>
        <Nav.Item>
            {step3 ? (
                <a href='/payment'>
                    <div className='py-2 px-4 '>Payment</div>
                </a>
            ) : (
                <Nav.Link disabled>Payment</Nav.Link>
            )}
        </Nav.Item>
        <Nav.Item>
            {step4 ? (
                <a href='/Placeorder'>
                    <div className='py-2 px-4'>Place Order</div>
                </a>
            ) : (
                <Nav.Link disabled>Place Order</Nav.Link>
            )}
        </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps