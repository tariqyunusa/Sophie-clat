import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Nav.css'
import { GoPlus } from "react-icons/go";
import gsap from 'gsap';

const Nav = () => {
 useEffect(() => {
  gsap.to([".nav", ".nav_icon"], {
    y: 30,
    opacity: 1,     
    stagger: 0.05,
    duration: 1,
    ease: "power2.out"
  });
}, []);
  
  return (
    <nav className='nav__section'>
      <div className="__logo nav__wrapper">
        <Link to='/' className='nav'>Sophie’s Éclat</Link>
      </div>
      <div className='nav__wrapper'>
      <Link to='/about' className='nav'>About</Link>
      </div>
      <div className='nav__wrapper'>
        <Link to='/collection' className='nav'>Collections</Link>
      </div>
      <div className='nav__wrapper'>
        <Link to='/gallery' className='nav'>Gallery</Link>
      </div>
      <div className="spacer__nav nav__wrapper">
       <GoPlus  className='nav_icon'/>
      </div>
    </nav>
  )
}

export default Nav
