import { Link, useParams } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  Form,
  Button,
  Card,
  ListGroup,
} from "react-bootstrap";
import Message from "../Components/Message";
import Loader from "../Components/Loader";
import { useGetOrdersDetailsQuery } from "../slices/ordersApiSlice";

function OrderDetailScreen() {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    error,
    isLoading,
  } = useGetOrdersDetailsQuery(orderId);
  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">Error fetching order details</Message>
  ) : (
    <>
      <h1>Order Details {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name:</strong> {order.user.name} <br />
                <strong>Email:</strong> {order.user.email} <br />
                <strong>Address:</strong> {order.shippingAddress.address},{" "}
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                , {order.shippingAddress.country}
              </p>
              <ListGroup.Item>
                {order.isDelivered ? (
                  <Message variant="success">
                    Delivered on {order.deliveredAt}
                  </Message>
                ) : (
                  <Message variant="danger">Not delivered</Message>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Payment Method</h2>
                <p>{order.paymentMethod}</p>
                {order.isPaid ? (
                  <Message variant="success">
                    Paid on {order.paiddAt}
                  </Message>
                ) : (
                  <Message variant="danger">Not Paid</Message>
                )}
              </ListGroup.Item>
            </ListGroup.Item>
            <ListGroup.Item>
                <h2>Order Items</h2>
                {order.orderItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row>
                        <Col md={3}>
                          <Image src={item.image} alt={item.name} fluid />
                        </Col>
                        <Col md={6}>
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                          <br />
                          <span>Quantity: {item.qty}</span>
                          <br />
                          <span>Price: ${item.price}</span>
                        </Col>
                        <Col md={3}>
                        {item.qty} x {item.price} = ${item.price * item.qty}
                        </Col>
                    </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
        <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Items</Col>
                        <Col>
                          ${order.itemsPrice.toFixed(2)}
                        </Col>
                    </Row>
                    <Row>
                        <Col>Shipping</Col>
                        <Col>
                          ${order.shippingPrice.toFixed(2)}
                        </Col>
                    </Row>
                    <Row>
                        <Col>Tax</Col>
                        <Col>
                          ${order.taxPrice.toFixed(2)}
                        </Col>
                    </Row>
                    <Row>
                        <Col>Total</Col>
                        <Col>
                          ${order.totalPrice.toFixed(2)}
                        </Col>
                    </Row>
                </ListGroup.Item>
                {/*PAY ORDER BUTTON PLACEHOLDER*/}
                {/*MARK AS DELIVERED PLACEHOLDER*/}
               </ListGroup>
        </Card>
        </Col>
      </Row>
    </>
  );
}

export default OrderDetailScreen;
