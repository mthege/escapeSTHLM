import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {setSessionCookie} from "./UserSession";
import axios from 'axios';
import Landing from './Landing';
import Register from './Register';
import './Register.css'
const LOGIN_URL = 'http://localhost:5001/users/login';

export function Login() {

    const userRef = useRef();
    const errRef = useRef();


    const [user, setUser] = useState();
    const [pwd, setPwd] = useState("");
    const [errMsg, setErrMsg] = useState(false);
    const [success, setSuccess] = useState(false);
    
useEffect(() => {

    userRef.current.focus();
}, [])

useEffect(() => {

    setErrMsg('')
}, [user, pwd]);

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
        setSuccess(true);
        setSessionCookie({user})

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
    <div className="login">
        {success ? (
            <section>
                <h1>You are logged in!</h1>
                <br />
                <p>
                  <Link to="/" >Go to Home</Link>
                </p>
            </section>
        ) : (
            <section>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
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
                        {/*put router link here*/}
                        <Link to = "/register">Sign Up</Link>
                    </span>
                </p>
            </section>
        )}
    </div>
)
}

export default Login