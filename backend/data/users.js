import bcryptjs from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@email.com',
        password: bcryptjs.hashSync('123456', 10),
        isAdmin: true
    },
    // Add more users here...
     {
         name: 'John Doe',
         email: 'john@email.com',
         password: bcryptjs.hashSync('password123', 10),
         isAdmin: false
     },
     {
         name: 'Jane Smith',
         email: 'jane@email.com',
         password: bcryptjs.hashSync('secret123', 10),
         isAdmin: false
     }
 ];

export default users;