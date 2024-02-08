import React from "react";
import '../CSS/Navbar.css';
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Navbar(){
    let navigate =useNavigate();
    let user = localStorage.getItem("Uemail")
    const logout = () =>{
    
        Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "LOG OUT"
        }).then((result) => {
        if (result.isConfirmed) {
            navigate("/")
            localStorage.clear();
        }
        });

    }
    return(
        <div>
            <ol class="navbar">
                <li className="nav1"><Link to="/home" className="nav">HOME</Link></li>
                <li className="nav2"><Link to="/sell" className="nav">SELL</Link></li>
                <li className="nav2"><Link to="/myProducts" className="nav">MY PRODUCTS</Link></li>
                <div className="dropdown">
                <li className="nav23">{user}</li>
                <div className="dropdown-contents">
                <li ><button  onClick={logout} className="nav">LOGOUT</button></li>
                
                </div>
                </div>
            </ol>
        </div>
    )
}
export default Navbar;