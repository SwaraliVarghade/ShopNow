import { useEffect, useState } from "react";

function Cart() {

    let [Cart, setCart] = useState([]);

    useEffect(() => {
        let List = [];
        if(localStorage.getItem('Cart')){
            List = JSON.parse(localStorage.getItem('Cart'));
            setCart(List);
        }
    }, []);

    let uniqueCart = Cart.filter((item, index, self) =>
            index === self.findIndex(x => x.id === item.id)
    );

    return (
        <>
            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bold">
                        Shopping Cart
                    </h2>
                    <h5 className="text-muted">
                        {Cart.length} Items
                    </h5>
                </div>
                {
                    Cart.length === 0 &&
                    <div className="text-center mt-5">
                        <h4>No Items in Cart</h4>
                    </div>
                }
                <div className="row">
                    <div className="col-lg-8">
                    {
                        uniqueCart.map((x, i) => (
                                <div key={i} className="card mb-3 shadow-sm border-0 rounded-4 p-3">
                                    <div className="row align-items-center">
                                        <div className="col-md-3 text-center">
                                            <img src={x.thumbnail} alt={x.title} className="img-fluid rounded" style={{height: "140px", objectFit: "cover"}}/>
                                        </div>
                                        <div className="col-md-5">
                                            <h5 className="fw-bold">
                                                {x.title}
                                            </h5>
                                            <p className="text-muted mb-1">
                                                Brand : {x.brand}
                                            </p>
                                            <p className="text-muted mb-2">
                                                Category : {x.category}
                                            </p>
                                            <h4 className="text-success fw-bold">
                                                ₹ {(x.price * 9.78).toFixed(2)}
                                            </h4>
                                        </div>

                                        <div className="col-md-2 text-center">
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <button className="btn btn-outline-secondary"> - </button>
                                                <span className="fw-bold fs-5">
                                                    {
                                                        Cart.filter(
                                                            y => y.id === x.id
                                                        ).length
                                                    }
                                                </span>
                                                <button className="btn btn-outline-secondary">  + </button>
                                            </div>
                                        </div>
                                        <div className="col-md-2 text-center">
                                            <button className="btn btn-outline-danger w-100">
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="col-lg-4">
                        <div className="card shadow-sm border-0 rounded-4 p-4">
                            <h4 className="fw-bold mb-4">
                                Order Summary
                            </h4>
                            <div className="d-flex justify-content-between mb-3">
                                <span>Subtotal</span>
                                <span>
                                    ₹ {
                                        Cart.reduce((sum, item) => 
                                            sum + (item.price * 9.78)
                                        ,0).toFixed(2)
                                    }
                                </span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span>Shipping</span>
                                <span className="text-success">
                                    Free
                                </span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span>Tax</span>
                                <span>
                                    ₹ 99
                                </span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between mb-4">
                                <h5 className="fw-bold">
                                    Total
                                </h5>
                                <h5 className="fw-bold text-success">
                                    ₹ {
                                        (Cart.reduce((sum, item) =>
                                                    sum + (item.price * 9.78)
                                            ,0) + 99).toFixed(2)
                                    }
                                </h5>
                            </div>
                            <button className="btn btn-success w-100 py-2 fw-bold">
                                Proceed To Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cart;