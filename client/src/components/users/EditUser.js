import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({
    name: '',
    email: '',
    designation: ''
  })

  const { name, email, designation } = user;

  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    loadUser()
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`https://employeemanagement-backend.onrender.com/api/users/${id}`, user);
    await axios.put(`http://localhost:5000/api/users/${id}`, user);
    navigate('/');
  }

  const loadUser = async () => {
    // const result = await axios.get(`http://localhost:5000/api/users/${id}`);
    const result = await axios.get(`https://employeemanagement-backend.onrender.com/api/users/${id}`);
    setUser(result.data)
  }

  return(
    <div className='container'>
      <div className="w-80 mx-auto shadow p-5">
        <h2 className='text-center mb-4'>Edit User</h2>
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
          <button className='btn btn-primary btn-block'>Update User</button>
        </form>
      </div>
    </div>
  )
}

export default EditUser;