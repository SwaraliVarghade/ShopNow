import { useEffect, useState } from "react";

function Wishlist(){
    let [Wishlist, setWishlist] = useState([]);
    let [cart, setCart] = useState([]);

    useEffect(()=>{
        getWishListData();
    },[]);

    function getWishListData(){
        let List = [];
        if(localStorage.getItem('Wishlist')){
            List = JSON.parse(localStorage.getItem('Wishlist'));
            setWishlist(List);
        }
        let cartList = [];
        if(localStorage.getItem('Cart')){
            cartList = JSON.parse(localStorage.getItem('Cart'));
            setCart(cartList);
        }
    }

    function AddToCart(item){
        let exsists = false;
        for(let i = 0; i < cart.length; i++){
            if(item.id == cart[i].id){
                exsists = true;
            }
        }
        if(exsists){
            let msg = window.confirm("Already Present in cart! Want to add one more..?");
            if(!msg){
                return;
            }
        }
        let UpdatedCart = [...cart, item];
        localStorage.setItem('Cart', JSON.stringify(UpdatedCart));
        window.dispatchEvent(new Event("storage"));
        setCart(UpdatedCart);
        let updatedWishlist = Wishlist.filter((x)=>{
            if(x.id != item.id){
                return x;
            }
        });
        setWishlist(updatedWishlist);
        localStorage.setItem('Wishlist', JSON.stringify(updatedWishlist))
    }

    function RemoveFromWishlist(item){
        let updateList = Wishlist.filter((x, i)=>{
            if(x.id !== item.id){
                return x;
            }
        });
        setWishlist(updateList);
        localStorage.setItem('Wishlist', JSON.stringify(updateList));
    }

    return(<>
        <div className="container mt-4">
            <h2>My Wishlist</h2>
            <p>{Wishlist.length} items</p>
            {
                Wishlist.length == 0 && <h5>No Items in Wishlist!! </h5>
            }
            {
                Wishlist.map((x, i)=>{
                    return (<div key={x.id} className="card mb-3 p-3">
                            <div className="row align-items-center">
                                <div className="col-md-2">
                                    <img src={x.thumbnail} className="img-fluid"></img>
                                </div>
                                <div className="col-md-4">
                                    <h2>{x.title}</h2>
                                    <p>₹ {(x.price * 9.78).toFixed(2)}</p>
                                </div>
                                <div className="col-md-6 text-end">
                                    <button className="btn btn-success me-2" onClick={()=>AddToCart(x)}>Add To Cart</button>
                                    <button className="btn btn-danger" onClick={()=>RemoveFromWishlist(x)}>Remove</button>
                                </div>
                            </div>
                        </div>);
                })
            }
        </div>
    </>)
}

export default Wishlist;