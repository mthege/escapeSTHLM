import React, {useContext} from "react";
import { Link } from "react-router-dom";
import {SessionContext, setSessionCookie} from "./UserSession";

import ('./Header.css')

export const Header = () => {

  const session = useContext(SessionContext);
  console.log("User (Header) " + session.user)

  return (
    <header>
      <div className="container">
        <div className="inner-content">
          <div className="brand">
            <Link to="/">escapeSTHLM</Link>
          </div>

          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>

            
            { session && session.user ? 
              <li>
                <Link to="/profile" className="nav-links">
                  Profile
                </Link>
              </li>
              : null }

            { session && session.user ? 
              <li>
                <Link to="/" onClick={setSessionCookie({})} >
                  Logout
                </Link>
              </li>
              : null }

            { !session || !session.user ? 
              <li>
                <Link to="/login" className="nav-links">
                  Login
                </Link>
              </li>
              : null }

            { !session || !session.user ? 
              <li>
                <Link to="/register" className="nav-links">
                  Register
                </Link>
              </li>
              : null }

            <li>
              <Link to="/add" className="btn btn-main">
                Search Rooms
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;