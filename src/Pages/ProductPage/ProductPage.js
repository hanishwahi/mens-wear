import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Store/Slices/ProductSlice";
import ProductDescription from "./ProductDescription";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ProductPage() {
    const [data, setData] = useState([]);
    const [pincode, setPincode] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [productSize, setProductSize] = useState("sm");
    const params = useParams();
    const prductID = params.id;
    
    useEffect(() => {
        async function fetchProducts() {
            let response = await fetch("http://localhost:5000/api/product/allProducts");
            response = await response.json();
            if (response.success) {
                setData(response.productlist);
            }
        }
        fetchProducts();
    }, []);
    let selectedProduct = data.find(item => item._id === prductID);
    const description = selectedProduct && selectedProduct.description;
    const plusCart = () => {
        setQuantity(quantity + 1);
    };
    const minusCart = () => {
        setQuantity(quantity - 1);
        if (quantity <= 1) {
            setQuantity(1);
        }
    };
    const handleProductSize = size => {
        setProductSize(size);
    };
    const dispatch = useDispatch();
    const addProduct = ({ item, price }) => {
        const { title, images } = item;
        const id = selectedProduct && selectedProduct._id;
        dispatch(addToCart({ title, images, price, quantity, productSize, id })); // Dispatching the addToCart action
    };
    // check the available pincode
    const handleCheckPincode = async e => {
        let key = e.target.value;
        if (key) {
            let response = await fetch(`http://localhost:5000/api/pincode/${key}`);
            response = await response.json();
            if (response.success === true) {
                setPincode(response.fetchPincode);
                console.log(response.fetchPincode);
            } else {
                setPincode("");
            }
        }
    };
    const [copied, setCopied] = useState(false);
    const copyUrlToClipboard = () => {
        // Get the current page URL
        const pageUrl = window.location.href;
        // Use the Clipboard API to copy the URL to clipboard
        navigator.clipboard.writeText(pageUrl);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1000);
    };
    return (
        <>
            <Header />
            <div className="container-fluid">
                <div className="container-lg">
                    <div className="row py-5">
                        {selectedProduct && (
                            <>
                                <div className="col-lg-5 col-12 mt-2">
                                    <div className="product_image">
                                        <img
                                            src={selectedProduct.images[0]}
                                            alt=""
                                            className="img-fluid"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6 mt-2">
                                    <div className="row">
                                        <div className="col product-page-content">
                                            <div className="d-flex gap-2 align-items-center mb-1">
                                                <h1>{selectedProduct.title}</h1>
                                                <i
                                                    style={{
                                                        cursor: "pointer",
                                                        fontSize: "20px",
                                                        color: "#35677a",
                                                    }}
                                                    onClick={copyUrlToClipboard}
                                                    className="fa-solid fa-copy"
                                                ></i>
                                                {copied && (
                                                    <p style={{ color: "green", fontSize: "14px", margin: "0", }}>
                                                        URL copied to clipboard!
                                                    </p>
                                                )}
                                            </div>
                                            <div className="d-flex gap-3 align-items-center">
                                                <div className="card-text1">
                                                    <del>MRP: {quantity * selectedProduct.price}/- </del>
                                                </div>
                                                <p className="card-text">
                                                    ₹{" "}
                                                    {Math.ceil(
                                                        selectedProduct.price -
                                                        (selectedProduct.price / 100) *
                                                        selectedProduct.discountPercentage
                                                    ) * quantity}
                                                    /-
                                                </p>
                                                <p className="text-success fw-bold mb-0">
                                                    ( {selectedProduct.discountPercentage}% Off )
                                                </p>
                                            </div>
                                            <div>
                                                {" "}
                                                <p className="text-success mb-0">
                                                    you saved ₹
                                                    {Math.trunc(
                                                        (selectedProduct.price / 100) *
                                                        selectedProduct.discountPercentage
                                                    ) * quantity}{" "}
                                                </p>
                                            </div>
                                            <h2>Brand: {selectedProduct.brand}</h2>
                                            {/* <h2>Price: ${selectedProduct.price}</h2> */}
                                            {/* <h2>{selectedProduct.discountPercentage}% Off </h2> */}
                                        </div>
                                    </div>
                                    <div className="d-flex gap-2 justify-content-start">
                                        <div>
                                            <button
                                                className={
                                                    productSize === "sm"
                                                        ? "productSizeSelected"
                                                        : "productSize"
                                                }
                                                onClick={() => handleProductSize("sm")}
                                            >
                                                SM
                                            </button>
                                        </div>
                                        <div>
                                            <button
                                                className={
                                                    productSize === "xl"
                                                        ? "productSizeSelected"
                                                        : "productSize"
                                                }
                                                onClick={() => handleProductSize("xl")}
                                            >
                                                XL
                                            </button>
                                        </div>
                                    </div>
                                    <div className="row text-center py-3">
                                        <div className="col-lg-3 col-5">
                                            <div className="row align-self-center">
                                                <div className="col-lg-4 col-4 counter-cart">
                                                    <h1 onClick={minusCart}>-</h1>
                                                </div>
                                                <div className="col-lg-4 col-4 counter-cart">
                                                    <h1 className="">{quantity}</h1>
                                                </div>
                                                <div className="col-lg-4 col-4 counter-cart">
                                                    <h1 onClick={plusCart}>+</h1>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-5">
                                            <button
                                                className="button"
                                                onClick={() =>
                                                    addProduct({
                                                        item: selectedProduct,
                                                        price: Math.floor(
                                                            selectedProduct.price -
                                                            (selectedProduct.price / 100) *
                                                            selectedProduct.discountPercentage
                                                        ),
                                                    })
                                                }
                                            >
                                                Add To Cart
                                            </button>
                                        </div>
                                        <div className="col-lg-4 col-2 wishlist-product-page text-center">
                                            <p>Add To Wishlist</p>
                                            <i className="fa-regular fa-heart"></i>
                                        </div>
                                    </div>
                                    <div className="row deliveryPincode">
                                        <input
                                            type="number"
                                            onChange={handleCheckPincode}
                                            placeholder="Enter pincode & check delivery"
                                        />
                                        {pincode.city && (
                                            <span
                                                style={{ fontSize: "14px", fontFamily: "monospace" }}
                                            >
                                                Delivery available in {pincode.city.toLowerCase()},{" "}
                                                {pincode.district}
                                            </span>
                                        )}
                                    </div>
                                    <div className="row product-page-content">
                                        <h2>Category : {selectedProduct.category}</h2>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <hr />
            <ProductDescription description={description} prductID={prductID} />
            <Footer />
        </>
    );
}
export default ProductPage;
