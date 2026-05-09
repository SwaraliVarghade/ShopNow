import './App.css';
import Home from './components/Home';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import Wishlist from './components/Wishlist';
import ShowDetails from './components/ShowDetails';
import Cart from './components/Cart';

function App() {
  return (
    <>  
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/details" element={<ShowDetails />} />
        <Route path='/cart' element={<Cart></Cart>}/>
        <Route path="/wishlist" element={<Wishlist></Wishlist>}></Route>
      </Routes>
    </>
  );
}

export default App;
