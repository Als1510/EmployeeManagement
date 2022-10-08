import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return(
    <nav className="navbar navbar-dark bg-primary">
      <NavLink className="navbar-brand" to="/">Employee Management</NavLink>
    </nav>
  )
}

export default Navbar