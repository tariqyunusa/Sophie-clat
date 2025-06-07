import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Nav.css'

const Nav = () => {
  
  
  return (
    <nav className='nav__section'>
      <div className="__logo">
        <Link to='/'>Sophie’s Éclat</Link>
      </div>
      <Link to='/about'>About</Link>
      <a href='/'>Collections</a>
      <a href='/'>Gallery</a>
      <div className="spacer__nav"></div>
    </nav>
  )
}

export default Nav
