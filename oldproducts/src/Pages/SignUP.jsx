import React ,{useState} from "react";
import cart from "../Images/mobile-app.png";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";
const Signup = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    let navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault(); // to prevent the default value
        const res = await axios.post("http://localhost:3002/signup", {
            name: name,
            email: email,
            password: password,
            number: number,
        })
        console.log(res.data)
        setErrorMessage('signup Successful')
        navigate("/")
    }
    return (
        <div>
            <div className="Login">
                <div className="LogBox">
                    <br />
                    <form onSubmit={handleSubmit}>
                        <div className="logsignButton">
                            <Link to="/"><button className="logbut2">LOGIN</button></Link>
                            <Link to="/signup"><button className="signbut2">SIGNUP</button></Link><br />
                        </div>
                        <div className="SignContents">
                            <input type="text" id="name"
                                value={name} onChange={(e) => setName(e.target.value)} 
                                required placeholder="UserName"></input><br />
                            <input type="password" id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required placeholder="Password"></input><br />
                            <input type="email" id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required placeholder="email"></input><br />
                            <input type="number" id="number"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                                required placeholder="PhNumber"></input><br />
                            

                            <input type="submit" value="SUBMIT"></input>
                        </div>
                        <p className="error">{errorMessage}</p>
                     

                    </form></div>
                <img src={cart} alt="cart" />
            </div>
        </div>
    )
}
export default Signup;