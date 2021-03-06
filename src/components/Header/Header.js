import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../../assets/DBlogo.svg";
import "./Header.css";

const Header = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const location = useLocation();
  // console.log(location.pathname);
  return (
    <>
      {location.pathname !== "/login" && (
        <div className="header">
          <div className="logo-nav">
            <div className="logo-container">
              <Link to="/">
                <img src={logo} className="logo" alt="Logo" />
              </Link>
            </div>
            <ul className={click ? "nav-options active" : "nav-options"}>
              <li className="option" onClick={closeMobileMenu}>
                <Link className="link" to="/">
                  Home
                </Link>
              </li>
              <li className="option" onClick={closeMobileMenu}>
                <Link className="link" to="/todo">
                  Todo
                </Link>
              </li>
              <li className="option mobile-option" onClick={closeMobileMenu}>
                <Link className="link" to="/login">
                  Sign In
                </Link>
              </li>
              <li className="option mobile-option" onClick={closeMobileMenu}>
                <Link className="link" to="/">
                  <div className="signup-btn">Sign Up</div>
                </Link>
              </li>
            </ul>
          </div>
          <ul className="signin-up">
            <li className="sign-in" onClick={closeMobileMenu}>
              <Link className="link" to="/login">
                Sign In
              </Link>
            </li>
            <li onClick={closeMobileMenu}>
              <Link className="link" to="/">
                <div className="signup-btn">Sign Up</div>
              </Link>
            </li>
          </ul>
          <div className="mobile-menu" onClick={handleClick}>
            {click ? (
              <FaTimes className="menu-icon" />
            ) : (
              <FaBars className="menu-icon" />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
