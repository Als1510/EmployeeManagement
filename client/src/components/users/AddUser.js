import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    designation: ''
  })

  const { name, email, designation } = user;

  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    // await axios.post("http://localhost:5000/api/users", user);
    await axios.post("https://employeemanagement-backend.onrender.com/api/users", user);
    navigate('/');
  }

  return (
    <div className='container'>
      <div className="w-80 mx-auto shadow p-5">
        <h2 className='text-center mb-4'>Add User</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div className='form-group'>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Enter your Name" name="name" defaultValue={name} onChange={e => onInputChange(e)} />
            </div>
            <div className="mb-3">
              <input type="email" className="form-control" placeholder="Enter your Email" name="email" defaultValue={email} onChange={e => onInputChange(e)} />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Enter your Designation(Ex. Software Engineer, Web Developer)" name="designation" defaultValue={designation} onChange={e => onInputChange(e)} />
            </div>
          </div>
          <button className='btn btn-primary btn-block'>Add User</button>
        </form>
      </div>
    </div>
  )
}

export default AddUser