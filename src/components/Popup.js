import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

function Popup(props){
    let [deleteData, setdelData] = useState([]);
    let [show, setShow] = useState(false);
    useEffect(()=>{
        let obj = props.obj;
        setdelData(obj);
        setShow(true);
    }, [props]);

    function funHide(){
        setShow(false);
    }

    function moveWishlist(){
        let Wishlist = [];
        if(localStorage.getItem('Wishlist')){
            Wishlist = JSON.parse(localStorage.getItem('Wishlist'));
        }
        let updateWishlist = [...Wishlist, deleteData];
        localStorage.setItem('Wishlist', JSON.stringify(updateWishlist));
        setShow(false);
        props.closepopup();
    }

    function removeProd(){
        let Cart = [];
        if(localStorage.getItem('Cart')){
            Cart = JSON.parse(localStorage.getItem('Cart'));
        }
        let UdtCart = Cart.filter((x, i)=>{
            if(x.id !== deleteData.id){
                return x;
            }
        });
        window.alert(deleteData.title," Removed!!");
        localStorage.setItem('Cart', JSON.stringify(UdtCart));
        setShow(false);
        window.dispatchEvent(new Event("storage"));
        props.closepopup();
        props.removeProd(deleteData);
    }

    return(<>
        <Modal show={show} onHide={funHide}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <h3>Save for later ?</h3>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <h5>{deleteData.title}</h5>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button className="btn btn-success" onClick={moveWishlist}>
                    Move to Wishlist
                </Button>
                <Button className="btn btn-danger" onClick={removeProd}>
                    Remove
                </Button>
            </Modal.Footer>
        </Modal>
    </>)
}
export default Popup;