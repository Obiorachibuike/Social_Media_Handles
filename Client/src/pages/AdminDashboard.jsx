// frontend/src/components/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/get_users');
        setUsers(response.data);
        // console.log(users);
        console.log(response.data);
        
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/delete_user/${id}`);
      setUsers(response);
      console.log(users);
      
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <p>Loading users...</p>;
  }

  return (
    <div>
      <h2>Admin Dashboard</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Handle</th>
              <th>Images</th>
            </tr>
          </thead>
          <tbody>
          <tr key="{user._id}">
                <td>Obiora Chibuike Praise</td>
                <td>@Obiorachibuike</td>
                <td>
                 
                    <a
                      href="{`/${image}`}"
                      key="{index}"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="{`/${image}`}"
                        alt={`uploaded by Image`}
                        width="100"
                        height="100"
                        style={{ marginRight: '10px' }}
                      />
                    </a>
                 
                </td>
              </tr>
          <tr key="{user._id}">
                <td>Obiora Chibuike Praise</td>
                <td>@Obiorachibuike</td>
                <td>
                 
                    <a
                      href="{`/${image}`}"
                      key="{index}"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="{`/${image}`}"
                        alt={`uploaded by Image`}
                        width="100"
                        height="100"
                        style={{ marginRight: '10px' }}
                      />
                    </a>
                 
                </td>
                <td><button onClick={() => {deleteUser()}}>Delete</button></td>
              </tr>
          </tbody>
      {users.length === 0 ? (
        <p>No user submissions yet.</p>
      ) : (
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.handle}</td>
                <td>
                  {user.images.map((image, index) => (
                    <a
                      href={`/${image}`}
                      key={index}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={`/${image}`}
                        alt={`uploaded by ${user.name}`}
                        width="100"
                        height="100"
                        style={{ marginRight: '10px' }}
                      />
                    </a>
                  ))}
                </td>
              </tr>
            ))}
      </tbody>
      )}
    </table>
    </div>
  );
};

export default AdminDashboard;
