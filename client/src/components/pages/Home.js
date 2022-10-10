import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

const Home = () => {
  const [ users, setUser ] = useState([]);

  useEffect(() => {
    loadUsers();
  }, [])

  const loadUsers = async () => {
    // const result = await axios.get("http://localhost:5000/api/users")
    const result = await axios.get("https://employeemanagementbackend.herokuapp.com/api/users")
    setUser(result.data.reverse())
  }

  const deleteUser = async id => {
    // await axios.delete(`http://localhost:5000/api/users/${id}`);
    await axios.delete(`https://employeemanagementbackend.herokuapp.com/api/users/${id}`);
    loadUsers();
  }

  return (
    <div className='container'>
      <div className='py-4'>
        <h1>Home Page</h1>
        <table className="table">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Designation</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
                <tr key={user.email}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.designation}</td>
                  <td>
                    <Link className="btn btn-outline-primary m-1" to={`/users/edit/${user._id}`}>Edit</Link>
                    <Link className="btn btn-danger m-1" onClick={()=> deleteUser(user._id)}>Delete</Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home