import React, {useContext, useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import {SessionContext, setSessionCookie} from "./UserSession";
import './Header.css';
import "bootstrap/dist/css/bootstrap.min.css";
import logo from '../images/icons8-detective-64.png';
/**
 * 
 * @returns a component that calls useContext and utilize its 
 * functionallity to changes the content depending on login in 
 * state or not. 
 * If the user is logged in, only "profile" and "log out" will be 
 * visible. If not log in 

 */
export const Header=() =>{

    const session = useContext(SessionContext);
    const [user, setUser] = useState(session?.user);
  
    useEffect(() => {
       setUser(session?.user)
    }, [session]);

    /**
     * Functionality for logout is declared. 
     */
  
    const logout = () => {
      setSessionCookie({});
      setUser(undefined);
    }
  return (
   //Responsive navbar with Bootstrap 
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} alt="logo" />
        escapeSTHLM       
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <ul className="nav-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              { user ?
              <li>
                <Link to="/profile" className="nav-links">
                  Profile
                </Link>
              </li>
              : null }

            { user ?
              <li>
                {/* Function logout is called */}
                <Link to="/" onClick={() => logout()} >
                  Logout
                </Link>
              </li>
              : null }

            { !user ?
              <li>
                <Link to="/login" className="nav-links">
                  Login
                </Link>
              </li>
              : null }

            { !user ?
              <li>
                <Link to="/register" className="nav-links">
                  Register
                </Link>
              </li>
              : null }

            <li>
              <Link to="/searchinput" className="nav-links">
                Search Rooms
              </Link>
            </li>
         </ul>
          
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
  );
 
}

export default Header; 


