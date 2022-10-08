import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [ users, setUser ] = useState([]);

  useEffect(() => {
    loadUsers();
  }, [])

  const loadUsers = async () => {
    const result = await (await axios.get("http://localhost:5000/api/users")).data;
    console.log(result)
    setUser(result)
    console.log(users)
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
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.designation}</td>
                </tr>
              })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home