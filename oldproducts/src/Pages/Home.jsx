import React, { useEffect, useState } from "react";
import "../CSS/Home.css"
import Navbar from './Navbar';
import Swal from "sweetalert2";

import axios from "axios";
const Home = () => {
    const [data,setData] =useState([ ]);
   
    const [que,setQue] =useState("");
    
    useEffect(() => {
        const fetchData = async () => {
            
            const response = await axios.get(`http://localhost:3002/display?q=${que}`);
            
            setData(response.data);
            
         
          };
    
          fetchData();
        }, [que]);

    
        
      const displayContent = (value)=>{
        console.log(value.describe)
        Swal.fire({
         
          
          html: `<div class="productDetails">
          <p><b>${value.name}</b></p>
          <p><b>Description:</b> ${value.describe}</p>
          <p><b>Product Age:</b> ${value.age} years</p>
          <p><b>Price:</b> ${value.price}</p>
          <p><b>Location:</b> ${value.location}</p>
          <p><b>Quantity:</b> ${value.quantity}</p>
          
          </div>`,
          
        });
      }
      const interestButton = (value)=>{
        Swal.fire({
          title: "Are you sure?",
          text: "Your Interest will be sent to the owner",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes"
        }).then((result) => {
          if (result.isConfirmed) {
            const res = axios.post("http://localhost:3002/viewInterest", {
            owner: value.user,
            viewer: localStorage.getItem("Uemail"),
            p_name: value.name,
            describe: value.describe,
        })
        console.log(res.data)
            Swal.fire({
              title: "Done",
              text: "Your interest has been sent.",
              icon: "success"
            });
            
            
          }
        });
      }
    return(
        <div>
            <Navbar/>
            <div className="search">
            
            <input type="text" id="search" placeholder="SEARCH" onChange={()=>{setQue(document.getElementById("search").value)}}></input>
            
            </div>
        <div>
        <ul className="HomeContent">
            {data.map((value)=>(
               
                <div className="Contents" onDoubleClick={()=>displayContent(value)}>
                <div className="cate">{value.category}</div>
                <div className="IMAGE"><img src={value.image} alt="wait" height={200} width={300}></img></div>
                <div className="type">{value.type}</div>
                <div className="name">{value.name}</div>
                <div className="price">Rs.{value.price}</div>
                <div className="offer">{value.offer}</div>
               
                <button className="interest" onClick={()=>interestButton(value)}>Show Interest</button>
               
                
                </div>
                
            )

           ) }
        </ul>
        </div>
        </div>
    )
}
export default Home;