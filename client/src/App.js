import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import  {Header}  from "./components/Header";
import { SearchInput } from "./components/SearchInput";
import {Landing } from "./components/Landing"
import "./App.css";
import {RoomCard} from "./components/RoomCard";
import {Profile} from "./components/Profile";
import {Login} from './components/Login';
import {Register} from './components/Register';
import {Footer} from './components/Footer';
import {getSessionCookie, SessionContext} from './components/UserSession.js'

/**
 * The standard component that defines the routes 
 * @returns Routes for all route-able components. 
 */
const App = () => {

  const [session, setSession] = useState(getSessionCookie());

  const loginSuccess = () => {
    setSession(getSessionCookie());
  }


  return (
   <div className="container-app">
     <SessionContext.Provider value={session}>
      <Router forceRefresh={true}>
        <Header />
        <Routes>
          <Route exact path="/" element={<Landing/>}/>
          <Route path="/searchinput" element={ <SearchInput />}/>
          <Route path="/profile" element={ <Profile/>}/>
          <Route path="/roomcard/:id" element= {<RoomCard/>}/> 
          <Route path="/login" element={ <Login loginSuccess={loginSuccess} />}/>
          <Route path="/register" element={ <Register />}/>
        </Routes>
      </Router>
     </SessionContext.Provider>

      <Footer/>
      </div>
  );
}

export default App;


