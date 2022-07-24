import React from 'react'
import { Link, BrowserRouter as Router} from 'react-router-dom'
import { useState } from 'react';


const Navbar = () => {
  return (
    <nav className='nav_bar'style={{position: 'relative'}}>
      <div className="logo">
        <h1>BOOKMonk</h1>
      </div>
      <button onClick={() => {
        document.querySelector('.nav_items').style.display = "block";
      }} className="menu_btn" style={{position: 'absolute', top: '15px', left: '10px', color: 'white', background: 'transparent', padding: '3px', border: '1px solid #ccc'}}>Menu</button>
      <ul style={{background: '#2b1d7f'}} className='nav_items'>
        <li><a href="/">Home</a></li>
        <li><a href="/features">Features</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/features">Contacts</a></li>
        <div style={{position: 'absolute', top :'5px', right: '10px', color: "#ccc", border: "1px solid white", padding: '2px', cursor:'pointer'}} onClick = {() => {
          document.querySelector('.nav_items').style.display = "none";
        }}>close</div>
      </ul>
      <div style = {{position: 'absolute', top: '17px',border: '2px solid #ccc', right: '5px', padding: '2px', color: 'white'}} className="cart"><a style={{color: 'white', textDecoratioin: 'nones'}} href="/cart">CART</a></div>
    </nav>
  )
}

export default Navbar