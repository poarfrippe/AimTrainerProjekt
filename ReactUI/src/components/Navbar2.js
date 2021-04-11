import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar2.css';

function Navbar({mode, setMode}) {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

 
  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar2'>
        <div className='navbar-container2'>
            <div className='nav-item2'>
              <div className={`nav-links2 ${mode === "classic" && "nav-links2-active"}`} onClick={() => {
                  setMode("classic");
              }}>
                Classic
              </div>
            </div>
            <div className='nav-item2'>
              <div className={`nav-links2 ${mode === "flick" && "nav-links2-active"}`} onClick={() =>{
                  setMode("flick");
              }}>
                Flick
              </div>
            </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;