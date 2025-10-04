import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './Home';
import Item from './Item';
import Upload from './Upload';
import Register from './Register';
import Login from './Login';
import Card from './Card';
import logo from "./logo.png";

import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
  MobileMenu
} from "./NavbarElements";
import About from './About';

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [greeting, setGreeting] = useState("");
  const [user, setUser] = useState(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  function logout() {
    localStorage.clear();
    setUser(null);
    navigate("/");
  }

  // Parse user safely from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        // If stored value is a plain string, wrap it in object
        setUser({ name: storedUser });
      }
    }
  }, []);

  // Set greeting message based on time
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  return (
    <>
      <Nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src={logo} alt="logo" style={{ width: "50px", height: "50px" }} />
          <h2 style={{ color: '#fff', margin: 0 }}>Task Mate</h2>
        </div>

        <Bars onClick={toggleMenu} />

        <NavMenu>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/card">Card</NavLink>
        </NavMenu>

        <NavBtn>
          {!user ? (
            <>
              <NavBtnLink to="/login">Login</NavBtnLink>
              <NavBtnLink to="/register">Register</NavBtnLink>
            </>
          ) : (
            <NavBtnLink to="/logout" onClick={logout}>Logout</NavBtnLink>
          )}
        </NavBtn>

        {/* Greeting with user image */}
        {user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fff' }}>
            {greeting}, <strong>{user.name}</strong> 👋
            {user.image && (
              <img
                src={user.image}
                alt="profile"
                style={{ width: "40px", height: "40px", borderRadius: "50%" }}
              />
            )}
          </div>
        )}
      </Nav>

      {/* Mobile Menu */}
      {isOpen && (
        <MobileMenu>
          <NavLink to="/" onClick={toggleMenu}>Home</NavLink>
          <NavLink to="/cloths" onClick={toggleMenu}>Cloths</NavLink>
          {!user ? (
            <>
              <NavBtnLink to="/login" onClick={toggleMenu}>Login</NavBtnLink>
              <NavBtnLink to="/register" onClick={toggleMenu}>Register</NavBtnLink>
            </>
          ) : (
            <NavBtnLink to="/logout" onClick={() => { logout(); toggleMenu(); }}>Logout</NavBtnLink>
          )}
          <NavBtnLink to="/card" onClick={toggleMenu}>Card</NavBtnLink>
        </MobileMenu>
      )}

      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/item' Component={Item} />
        <Route path='/upload' Component={Upload} />
        <Route path='/register' Component={Register} />
        <Route path='/login' Component={Login} />
        <Route path='/card' Component={Card} />
        <Route path='/about' Component={About} />
        <Route path='/logout' Component={Home} />
      </Routes>
    </>
  );
};

export default Navbar;
