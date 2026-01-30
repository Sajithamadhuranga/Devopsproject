import React from 'react';
import './Navbar.css';
import { GiAbstract008 } from "react-icons/gi";
import { Link } from 'react-router-dom'; // ✅ import Link

const Navbar = () => {
  return (
    <section className='navBarSection'>
      <div className="header">
        <div className="logoDiv">
          <Link to="/" className="logo">
            <h1 className='flex'><GiAbstract008 className="icon" />
              Spicy
            </h1>
          </Link>
        </div>

        <div className="navBar">
          <ul className="navList flex">
            <li className="navItem">
              <Link to="/" className="navLink">Home</Link>
            </li>

           

            <li className="navItem">
              <Link to="/stock" className="navLink">Stock</Link>
            </li>

             <li className="navItem">
              <Link to="/dashboard" className="navLink">Dashboard</Link>
            </li>
            

            <div className="headerBtns flex">
             <button className="btn loginBtn">
  <Link to="/login">Login</Link>
</button>

              <button className='btn'>
                <Link to="/signup">Sign Up</Link>
              </button>
            </div>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
