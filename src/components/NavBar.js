import logo from "../Assets/logo.png";
import { NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";

function NavBar(){
    let [cartData, setData] = useState([]);
    useEffect(() => {
        function updateCart(){
                if(localStorage.getItem('Cart')){
                let data = JSON.parse(localStorage.getItem('Cart'));
                setData(data);
            }
        }
        updateCart();

        window.addEventListener("storage", updateCart);

        return ()=>{
            window.removeEventListener("storage", updateCart);
        }
    }, []);

    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <NavLink to="/" className="navbar-brand d-flex align-items-center">
                    <img src={logo} alt="logo" style={{height: "40px", marginRight: "10px"}} />
                    SHOPNOW
                </NavLink>

                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <NavLink to="/" className="nav-link">
                            Home
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/wishlist" className="nav-link">
                            Wishlist
                        </NavLink>
                    </li>
                </ul>

                <NavLink to="/cart" className="nav-link position-relative"> 
                    <FaShoppingCart size={18} /> 
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: "12px" }}> 
                        {cartData.length}
                    </span> 
                </NavLink>
            </div>
        </nav>
    );
}

export default NavBar;