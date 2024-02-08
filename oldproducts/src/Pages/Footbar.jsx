import React from "react";
import '../CSS/Navbar.css';
import github from "../Images/icons8-github-48.png";
import linked from "../Images/icons8-linked-in-48.png";
import insta from "../Images/icons8-instagram-48.png";
function Footbar(){
    return(
        <div className="Footer">
            <h4>&copy;ARAVINDAN A</h4>
            <a href=""><img src={linked}/></a>
            <a href="https://github.com/ARAVINDAN-2701/Reused_Products"><img src={github}/></a>
            <a href=""><img src={insta}/></a>
        </div>
    )
}
export default Footbar;