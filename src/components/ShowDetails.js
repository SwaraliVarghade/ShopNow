import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

function ShowDetails() {
    let loc = useLocation();
    let navigate = useNavigate();
    let data = loc.state;

    let [cartData, setData] = useState([]);
    let [wishlist, setWishlist] = useState([]);
    useEffect(()=>{
        if(localStorage.getItem('Cart')){
            let data = JSON.parse(localStorage.getItem('Cart'));
            setData(data);
        }
        if(localStorage.getItem('Wishlist')){
            let Wishlistdata = JSON.parse(localStorage.getItem('Wishlist'));
            setWishlist(Wishlistdata);
        }
    },[]);
    
    function addToCart(){
        let updatedCart = [...cartData, data];
        setData(updatedCart);
        localStorage.setItem('Cart', JSON.stringify(updatedCart));
        window.dispatchEvent(new Event("storage"));
        alert(data.title+" Added to cart!");
    }

    function addToWishlist(){
        let updatedWishlist = [...wishlist, data]; 
        setWishlist(updatedWishlist);
        localStorage.setItem('Wishlist', JSON.stringify(updatedWishlist));
        window.alert("Added to Wishlist");
    }

    return (
        <>
            <div className="container mt-4">
                <button className="btn btn-secondary mb-3" onClick={()=>navigate(-1)}>Back</button>
                {/* Image side */}
                <div className="row">
                    <div className="col-md-5">
                        <img src={data.thumbnail} className="img-fluid rounded border"></img>
                    
                        <div className="d-flex mt-3 gap-2">
                            {
                                data.images.map((x, i)=>{
                                    return <img key={i} src={x} width="70" className="round border" alt="product"></img>
                                })
                            }
                        </div>
                    </div>
                    {/* detail side */}
                    <div className="col-md-7">
                        <h2>{data.title}</h2>
                        <p className="text-muted">{data.brand} | {data.category}</p>
                        <h3 className="text-success">₹ {(data.price * 9.78).toFixed(2)}</h3>
                        <p>
                            <span className="badge bg-warning text-dark">⭐ {data.rating}</span>({data.reviews.length} reviews)
                        </p>
                        <p>{data.description}</p>
                        <hr></hr>

                        <p><b>Available : </b>{data.availabilityStatus}</p>
                        <p><b>Shipping : </b>{data.shippingInformation}</p>
                        <p><b>Warranty : </b>{data.warrantyInformation}</p>
                        <p><b>Return Policy : </b>{data.returnPolicy}</p>

                        <hr></hr>

                        <div className="d-flex gap-3">
                            <button className="btn btn-outline-success" onClick={()=>addToCart()}>Add to Cart</button>
                            <button className="btn btn-outline-danger" onClick={()=>addToWishlist()}>Wishlist</button>
                        </div>
                    </div>
                </div>

                <div className="mt-5">
                    <h4>Customer Review</h4>
                    {
                        data.reviews.map((rev, i)=>{
                            return (<div key={i} className="border p-3 mb-2 rounder">
                                    <b>{rev.reviewerName}</b>
                                    <p className="mb-1">⭐ {rev.rating}</p>
                                    <p>{rev.comment}</p>
                                </div>)
                        })
                    }
                </div>
            </div>
        </>
    );
}

export default ShowDetails;