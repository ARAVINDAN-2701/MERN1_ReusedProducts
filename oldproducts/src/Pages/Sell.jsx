import React, { useState } from "react";
import "../CSS/Sell.css"
import Navbar from './Navbar';
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Sell = () => {

    const [category, setCategory] = useState("")
    const [type, setType] = useState("")
    const [name, setName] = useState("")
    const [describe, setDescribe] = useState("")
    const [age, setAge] = useState("")
    const [quantity, setQuantity] = useState("")
    const [image,setImage] = useState("")
    const [price, setPrice] = useState("")
    const [location, setLocation] = useState("")
    const [offer, setOffer] = useState("")
    const [errorMessage, setErrorMessage] = useState('');
    const [item, setItem] = useState([])
    let navigate = useNavigate();
    const change = (e) => {
        var Cars = ["Select", "Skoda", "Toyota", "BMW", "Suzuki", "Tata", "Others"]
        var Furn = ["Select", "Sofa", "DiningTable", "Shelf", "Showcase", "Others"]
        var Bikes = ["Select", "Suzuki", "Aprilla", "Bajaj", "Honda", "Ktm", "RoyalEnfield", "Others"]
        var EG = ["Select", "Mobile", "Tv", "AC", "Laptop", "Others"]

        switch (document.getElementById("cat").value) {
            case "Furniture":
                setItem(Furn);
                break;
            case "Cars":
                setItem(Cars);
                break;
            case "Bikes":
                setItem(Bikes);
                break;
            case "ElectronicGadgets":
                setItem(EG);
                break;
            default:
                setItem([]);
                break;
        }
        setCategory(e.target.value)
    }
    const Terms = () => {

        Swal.fire({
            icon: "info",
            title: "Terms & Condition",
            html: `<ol class="popup">
            <li><b>User Agreement:</b> Outlines the terms users agree to when using the platform. It may include information about eligibility, account creation, and user responsibilities.</li> 
            <li><b>Product Listings:</b> Describes the rules and guidelines for creating product listings, including what can and cannot be sold on the platform.</li>
            <li><b>Transactions:</b> Details the process of buying and selling on the platform, including payment methods, shipping, and returns.</li>
            <li><b>User Conduct:</b> Defines acceptable behavior on the platform, including rules against fraud, harassment, and other prohibited activities.</li>
            <li><b>Intellectual Property:</b> Outlines the platform's policy regarding intellectual property rights, including copyright and trademark issues.</li>
            <li><b>Privacy Policy:</b> Describes how user data is collected, used, and protected. It may cover issues like data sharing, cookies, and third-party services.</li>      
            <li><b>Dispute Resolution:</b> Provides information on how disputes between users or between users and the platform will be resolved.</li>
            <li><b>Liability and Disclaimers:</b> States the limitations of the platform's liability and includes disclaimers about the quality, safety, and legality of products and services.</li>
            <li><b>Termination:</b> Outlines the circumstances under which the platform can terminate user accounts or discontinue services.</li>
            <li><b>Updates to Terms and Conditions:</b> States that the terms and conditions may be updated, and users are responsible for staying informed about any changes.</li>
            <li><b>Compliance with Laws:</b> Requires users to comply with all applicable laws and regulations when using the platform.</li>
            <li><b>Age Restrictions:</b> Specifies the minimum age requirement for users to access the platform.</li>
            </ol>`

        });
    }
    let user = localStorage.getItem("Uemail")
    const handleSellData = async (event) => {

        event.preventDefault();
        const res = await axios.post("http://localhost:3002/sell", {
            user:user,
            category: category,
            type: type,
            name: name,
            describe: describe,
            age: age,
            quantity: quantity,
            image:image,
            price: price,
            location: location,
            offer: offer,
        })
        console.log(res.data)
        setErrorMessage('Product registered successfully')
        navigate("/sell")
        setCategory("");
        setType("");
        setName("");
        setQuantity("");
        setImage("");
        setPrice("");
        setLocation("");
        setAge("");
        setOffer("");
        setDescribe("");
    }
    const convertToBase64 = (e)=>{
        const reader = new FileReader ();
        reader.readAsDataURL(e.target.files[0])
        reader.onload = ()=>{
            console.log(reader.result)
            setImage(reader.result)
        }

    }

    return (

        <div><Navbar />
            <div className="sellBack">
                <div className="sellForm">
                    <form onSubmit={handleSellData}>
                        <table cellPadding={15} cellSpacing={5}>
                            <tr>
                                <td className="title" colSpan={2}>Sell Ur Pre-Owned Products </td>
                            </tr>
                            <tr>
                                <th>Choose a Category:</th>
                                <td><select id="cat" onChange={change} value={category} required>
                                    <option value="None">Select</option>
                                    <option value="Furniture">Furniture</option>
                                    <option value="Cars">Cars</option>
                                    <option value="Bikes">Bikes</option>
                                    <option value="ElectronicGadgets">Electronic Gadgets</option>

                                </select></td>
                            </tr>
                            <tr>
                                <th>Choose a Type:</th>
                                <td><select value={type} onChange={(e) => { setType(e.target.value) }} required>
                                    {item.map((val, index) => (
                                        <option key={index} value={val}>{val}</option>
                                    ))}
                                </select></td></tr>
                            <tr>
                                <th>Product Name:</th>
                                <td><input type="text" value={name} onChange={(e) => { setName(e.target.value) }} required></input></td>
                            </tr>
                            <tr>
                                <th>Product Description:</th>
                                <td><textarea placeholder="max-limit 200 characters" cols={5} maxLength={200} value={describe} onChange={(e) => { setDescribe(e.target.value) }}></textarea></td>
                            </tr>
                            <tr>
                                <th>Product's Age:</th>
                                <td><input type="number" value={age} onChange={(e) => { setAge(e.target.value) }} required></input></td>
                            </tr>
                            <tr>
                                <th>Quantity:</th>
                                <td><input type="number" value={quantity} onChange={(e) => { setQuantity(e.target.value) }}></input></td>
                            </tr>
                            <tr>
                                <th>Price:</th>
                                <td><input type="number" placeholder="Rupees" value={price} onChange={(e) => { setPrice(e.target.value) }} required></input></td>
                            </tr>
                            <tr>
                                <th>Product Images:</th>
                                <td><input type="file" accept=".png, .jpeg, .jpg" onChange={convertToBase64} required></input></td>
                            </tr>
                            <tr>
                                <th>Product Location:</th>
                                <td><input type="test" placeholder="District,State,Country" value={location} onChange={(e) => { setLocation(e.target.value) }}></input></td>
                            </tr>
                            <tr>
                                <th>Price Offer:</th>
                                <td><select value={offer} onChange={(e) => { setOffer(e.target.value) }}>
                                    <option value="Not Negotiable">Not Negotiable</option>
                                    <option value="Negotiable">Negotiable</option>
                                </select></td>
                            </tr>
                            <tr>
                                <th>View Terms:</th>
                                <td><button onClick={Terms}>Terms & Conditions</button></td>
                            </tr>
                            <tr>
                                <th>I Accept The Terms <br />and Conditions:</th>
                                <td><input type="checkbox" className="checkBox" required></input></td>
                            </tr>
                            <tr>

                                <td colSpan={2}><input type="submit" value="CREATE"  ></input></td>

                            </tr>
                        </table>
                        <p>{errorMessage}</p>
                       
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Sell;



