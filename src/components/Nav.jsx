import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Nav.css'
import { GoPlus } from "react-icons/go";

const Nav = () => {
  
  
  return (
    <nav className='nav__section'>
      <div className="__logo">
        <Link to='/'>Sophie’s Éclat</Link>
      </div>
      <Link to='/about'>About</Link>
      <Link to='/collection'>Collections</Link>
      <Link to='/gallery'>Gallery</Link>
      <div className="spacer__nav">
       <GoPlus />
      </div>
    </nav>
  )
}

export default Nav
