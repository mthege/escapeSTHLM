import React, {useContext, useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import {SessionContext, setSessionCookie} from "./UserSession";
import './Boot.css';
import "bootstrap/dist/css/bootstrap.min.css";

export const Boot=() =>{

    const session = useContext(SessionContext);
    const [user, setUser] = useState(session?.user);
  
    useEffect(() => {
       setUser(session?.user)
    }, [session]);
  
    const logout = () => {
      setSessionCookie({});
      setUser(undefined);
    }
  return (
<header>
    <nav>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">
       
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
              <Link to="/add" className="btn btn-main">
                Search Rooms
              </Link>
            </li>
         </ul>
         {/*   <Nav.Link href="/">Home</Nav.Link>
          { user ?
          <Nav.Link href="/profile"><Link to="/profile" className="nav-links">
          Profile
        </Link></Nav.Link>
           : null }
        { user ?
          <Nav.Link to="/login">  <Link to="/login" className="nav-links">
          Login
        </Link></Nav.Link>
          : null }
{ user ?          <Nav.Link href="/register"><Link to="/register" className="nav-links">
          Register
        </Link></Nav.Link>
          : null }
{ user ?          <Nav.Link href="/logout"> <Link to="/" onClick={() => logout()} >
          Logout
        </Link></Nav.Link>
          : null }
{ user ?          <Nav.Link href="/add">Search Rooms</Nav.Link>
          : null }
          */}
          
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </nav> 
  </header>);
 
}

export default Boot; 





 {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown> */}