import { Table, Button, Nav } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import Message from "../../Components/Message";
import Loader from "../../Components/Loader";
import { useGetOrdersQuery } from "../../slices/ordersApiSlice";
import Paginating from "../../Components/Paginating";

function OrderListScreen() {
  const { pageNumber } = useParams();
  const { data, isLoading, error } = useGetOrdersQuery({ pageNumber });

  // Debugging logs
  console.log("isLoading", isLoading); // Check if the query is loading
  console.log("Fetched Data:", data?.orders); // Check the entire response structure
  console.log("Error:", error);

  const orders = data?.orders; // Users data from API response
  const pages = data?.pages; // Total pages from API response
  const page = data?.page; // Current page from API response

  return (
    <>
      <h1>Orders</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Date</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders?.length > 0 ? (
            orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  <Nav.Link as={Link} to={`/order/${order._id}`}>
                    <Button variant="info">Details</Button>
                  </Nav.Link>
                </td>
              </tr>
            ))):(
            <tr>
              <td colSpan={7}>No orders found</td>
            </tr>)}
          </tbody>
        </Table>
      )}
      {/* Pagination Component */}
      <Paginating
        pages={pages} // Total pages
        page={page} // Current page
        isOrderList={true}
      />
    </>
  );
}

export default OrderListScreen;
