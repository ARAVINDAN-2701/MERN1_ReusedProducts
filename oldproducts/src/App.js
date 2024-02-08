import '../src/CSS/App.css';
import '../src/CSS/Navbar.css';
import Login from './Pages/Login';
import Signup from './Pages/SignUP';
import Sell from './Pages/Sell'
import Home from './Pages/Home';
import MyProducts from './Pages/MyProducts';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footbar from './Pages/Footbar';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
    
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/home' element={<Home/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/sell' element={<Sell/>}></Route>
      <Route path='/myProducts' element={<MyProducts/>}></Route>
    </Routes>
    <Footbar/>
    </BrowserRouter>
    
    </div>
  );
}
export default App;
