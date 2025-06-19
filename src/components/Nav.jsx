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
      <a href='/collection'>Collections</a>
      <a href='/'>Gallery</a>
      <div className="spacer__nav">
       <GoPlus />
      </div>
    </nav>
  )
}

export default Nav
