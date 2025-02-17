
import { Table, Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaTimes, FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Message from "../../Components/Message";
import Loader from "../../Components/Loader";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../slices/usersApiSlice";
import { toast } from "react-toastify";
import Paginating from "../../Components/Paginating";

function UserListScreen() {
  const { pageNumber = 1 } = useParams(); // Default to page 1 if not provided
  const { data, isLoading, error, refetch } = useGetUsersQuery({ pageNumber });
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  // Debugging logs
  console.log("isLoading", isLoading);   // Check if the query is loading
  console.log("Fetched Data:", data?.users);    // Check the entire response structure
  console.log("Error:", error); // Log any errors

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteUser(id);
        refetch(); // Refetch to update the user list after deletion
        toast.success(`User deleted successfully`);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const users = data?.users; // Users data from API response
  const pages = data?.pages; // Total pages from API response
  const page = data?.page;   // Current page from API response

  if (isLoading) {
    return <Loader />; // Show loader while fetching data
  }

  if (error) {
    return <Message variant="danger">{error.message || 'Error fetching users'}</Message>; // Handle error
  }

  if (!users || users.length === 0) {
    return <Message variant="warning">No users found</Message>; // Handle no users case
  }

  return (
    <>
      <h1>Users</h1>
      {loadingDelete && <Loader />} {/* Show loader while deleting */}

      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ADMIN</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users?.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: 'green' }} />
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  <Nav.Link as={Link} to={`/admin/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <FaEdit />
                    </Button>
                  </Nav.Link>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <FaTrash style={{ color: 'white' }} />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No users found</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Pagination Component */}
      <Paginating 
        pages={pages} // Total pages
        page={page}   // Current page
        isUserList={true} 
      />
    </>
  );
}

export default UserListScreen;
