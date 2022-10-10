import React from 'react'
import { NavLink, Link } from 'react-router-dom'

const Navbar = () => {
  return(
    <nav className="navbar navbar-dark bg-primary">
      <NavLink className="navbar-brand" to="/">Employee Management</NavLink>
      <Link className='btn btn-outline-light mr-2' to='/users/add'>Add User</Link>
    </nav>
  )
}

export default Navbar