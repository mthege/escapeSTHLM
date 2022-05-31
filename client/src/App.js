import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import  {Header}  from "./components/Header";
import { Add } from "./components/Add";
import {Landing } from "./components/Landing"
import "./App.css";
import {RoomCard} from "./components/RoomCard";
import {Profile} from "./components/Profile";
import {Login, Logout} from './components/Login';
import {Register} from './components/Register';
import {Footer} from './components/Footer';
import {getSessionCookie, SessionContext, setSessionCookie} from './components/UserSession.js'
//import { GlobalProvider } from "./context/GlobalState";

function App() {
  const [session, setSession] = useState(getSessionCookie());
  useEffect(() => {
    setSessionCookie(getSessionCookie());
  });

  return (
   <div className="container-app">
     <SessionContext.Provider value={session}>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Landing/>}/>
          <Route path="/add" element={ <Add />}/>
          <Route path="/profile" element={ <Profile/>}/>
          <Route path="/roomcard/:id" element= {<RoomCard/>}/> 
          <Route path="/login" element={ <Login />}/>
          <Route path="/register" element={ <Register />}/>
        </Routes>
      </Router>
      </SessionContext.Provider>

      <Footer/>
      </div>
  );
}

export default App;


