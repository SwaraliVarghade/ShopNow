import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function Home() {
    let [categories, setCategories] = useState([]);
    let [AllProducts, setproducts] = useState([]);  
    let [flag, setFlag] = useState(true);
    let [loading, setLoading] = useState(true);

    async function getAllCategories() {
        setLoading(true);
        let response = await fetch("https://dummyjson.com/products/category-list");
        let result = await response.json();
        setCategories(result);
        setLoading(false);
    }

    async function getAllProducts(pgNo = 1) {
        setLoading(true);
        let url = "https://dummyjson.com/products?limit=12&skip="+(pgNo-1)*12;
        let response = await fetch(url);
        let result = await response.json();
        setproducts(result.products);
        setFlag(true);
        setLoading(false);
    }

    async function getProductsByCategory(x, pgNo = 1) {
        let url = "https://dummyjson.com/products/category/"+x+"?limit=12&skip="+(pgNo-1)*12;
        let response = await fetch(url);
        let result = await response.json();
        setproducts(result.products);
        console.log(result.products);
        setFlag(false);
    }
    let [wishlist, setWishlist] = useState([]);
    let [cartData, setData] = useState([]);

    useEffect(() => {
        getAllCategories();
        getAllProducts();
        if(localStorage.getItem('Cart')){
            let data = JSON.parse(localStorage.getItem('Cart'));
            setData(data);
        }
        if(localStorage.getItem('Wishlist')){
            let Wishlistdata = JSON.parse(localStorage.getItem('Wishlist'));
            setWishlist(Wishlistdata);
        }
    }, []);

    let [details, setDetailObj] = useState({});
    let [detailFlag, setDetailFlag] = useState(false);// remve this
    let navigate = useNavigate();
    function showDetails(obj){
        setDetailObj(obj);
        setDetailFlag(true);
        navigate("/details", {state : obj})
    }

    function addToCart(data){
        let updatedCart = [...cartData, data]
        setData(updatedCart);
        localStorage.setItem('Cart', JSON.stringify(updatedCart));
        window.dispatchEvent(new Event("storage"));
        alert(data.title+" Added to cart!");
    }

    function addToWishlist(data){
        let updatedWishlist = [...wishlist, data];
        setWishlist(updatedWishlist);
        localStorage.setItem('Wishlist', JSON.stringify(updatedWishlist));
        window.alert("Added to Wishlist");
    }

    return (
        <div className="container-fluid">
            <div className="row">

                <div className="col-md-3 bg-light p-3">
                    <h4>Categories</h4>

                    <div className="list-group">
                        <button className="list-group-item list-group-item-action" onClick={()=>{getAllProducts()}}>
                        All
                        </button>
                        {
                            categories.map((x, i) => {
                                return <button key={i} className="list-group-item list-group-item-action" onClick={()=>getProductsByCategory(x)}>{x}</button>
                            })
                        }
                    </div>
                </div>

                <div className="col-md-9">
                    <h3 className="mt-3">Products</h3>
                    {
                        flag && (
                            <div className="d-flex justify-content-center mt-4" >
                                <ul className="pagination">
                                    {[...Array(10)].map((x, i) => (
                                        <li key={i} className="page-item">
                                            <button className="page-link" style={{ cursor: "pointer" }} onClick={() => getAllProducts(i + 1)}>
                                                {i + 1}
                                            </button>
                                        </li>
                                    ))}

                                </ul>
                            </div>
                        )
                    }
                    {
                        loading ? (<div className="d-flex justify-content-center align-items-center" style={{height:"80vh"}}>
                                    <div className="spinner-border text-success"></div>
                                </div>):
                            (<div className="row row-cols-1 row-cols-md-4 g-4">
                            {
                                AllProducts.map((x, i)=>{
                                    let price = (x.price * 9.78).toFixed(2);
                                    return (    
                                        <div key={x.id} className="col">
                                            <div className="card">
                                                <img src={x.thumbnail} className="card-img-top" alt={x.title}></img>
                                                <div className="card-body">
                                                    <h5 className="card-title">{x.title}</h5>
                                                    <p className="card-text">{price}</p>
                                                    <div className="d-flex justify-content-between">
                                                        <button className="btn btn-outline-info" onClick={()=>showDetails(x)}>Details</button>
                                                        <button className="btn btn-outline-success" onClick={()=>addToCart(x)}>Add to cart</button>
                                                        <button className="btn btn-outline-danger" onClick={()=>addToWishlist(x)}>❤</button>
                                                    </div>  
                                                </div>
                                            </div>
                                        </div>)
                                    })
                            }
                            </div>)
                    }
                </div>
            </div>
        </div>
    );
}

export default Home;