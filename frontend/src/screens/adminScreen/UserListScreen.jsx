import {Table, Button, Nav} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { FaTimes , FaTrash , FaEdit, FaCheck} from 'react-icons/fa'
import Message from '../../Components/Message'
import Loader from '../../Components/Loader'
import { useGetUsersQuery } from '../../slices/usersApiSlice'

function UserListScreen() {
  const { data: users, refetch, isLoading, error} = useGetUsersQuery()

  const deleteHandler = (id) => {
  console.log(`delete`)
  }

  return (
    <>
    <h1>Users</h1>
    {isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
      <Table striped bordered hover responsive className='table-sm'>
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
          {users.map((user) => (<tr key={user._id}>
            <td>{user._id}</td>
            <td>{user.name}</td>
            <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
            <td>{user.isAdmin? (
               <FaCheck style={{color: 'green'}}/>
            ) : (
              <FaTimes style={{color: 'red'}}/>
            )}</td>
         
            <td>
            <Nav.Link as={Link} to={`admin/user/${user._id}/edit`}>
                  <Button variant="info">
                    <FaEdit />
                  </Button>
                </Nav.Link>
                <Button variant="danger" className='btn-sm' onClick={() => deleteHandler(user._id)}>
                  <FaTrash style={{color: 'white'}}/>
                </Button>
            </td>
          </tr>))}
        </tbody>
      </Table>
    )}
    </>
  )
}

export default UserListScreen
