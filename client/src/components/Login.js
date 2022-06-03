import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {setSessionCookie, getSessionCookie} from "./UserSession";
import axios from 'axios';
import Landing from './Landing';
import Register from './Register';
import './Register.css'
import { useNavigate } from 'react-router-dom'
const LOGIN_URL = 'http://localhost:5001/users/login';

/**
 * 
 * @param {Function} loginSuccess 
 * @returns page that handles login via a form. 
 * The user submits user name and password and that data is matched with data 
 * in data base. The user is logged in or gets refused 
 */
export function Login({loginSuccess}) {
//Hooks to handle state of login and if the process is successfull
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState();
    const [pwd, setPwd] = useState("");
    const [errMsg, setErrMsg] = useState(false);
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setErrMsg('')
    }, [user, pwd]);

    useEffect(() => {
        if(success) {
            console.log("Login success!")
            loginSuccess()
            setTimeout(() => {
                navigate('/')
              }, 2000)
         }
    }, [success]);
    
    /**
     * 
     * @param {Event} e 
     * Function handleSubmit controls that the data 
     * submited corelates with stored data from database. 
     */
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            setUser(user);
            setSessionCookie({user})
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 401) {
            setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (

        //JSX 
        <div className="login">
        
        {/* Successfull login */}
        {success ? (
            <section>
                <h1>You are logged in!</h1>
                <br />
                <p>
                  <Link to="/" >Go to Home</Link>
                </p>
            </section>
        ) : (

            //If data submitted is incorrect, am error message is displayed
            <section>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1>Sign In</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                    />
                    <button>Sign In</button>
                </form>
                <p>
                    Need an Account?<br />
                    <span className="line">
                        <Link to = "/register">Sign Up</Link>
                    </span>
                </p>
            </section>
        )}
    </div>
    )}

export default Login