import React from "react";
import "../CSS/App.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import cart from "../Images/mobile-app.png";
import { Link } from "react-router-dom";
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    let navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await axios.post("http://localhost:3002/login", { email: email, password: password })
        console.log(res.data)
        if (res.data.loggedIn === true) {
            navigate("/home")
            setErrorMessage('Login up successful!');
            localStorage.setItem("Uemail",document.getElementById("email").value);
        }

    }
    return (
        <div className="Login">

            <div className="LogBox">
                <br />
                <form onSubmit={handleSubmit}>
                    <div className="logsignButton">
                        <Link to="/"><button className="logbut1">LOGIN</button></Link>
                        <Link to="/signup"><button className="signbut1">SIGNUP</button></Link><br />
                    </div>
                    <div className="loginContents">

                        <input type="email" id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required placeholder="email"></input><br />
                        <input type="password" id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required placeholder="Password"></input><br />
                        <button>Login</button><br />
                        <p className="error">{errorMessage}</p>
                        <h5><a href="/login">Forgot password?</a></h5><br />
                    </div>

                </form></div>
            <img src={cart} alt="cart" />
        </div>
    )
}
export default Login;