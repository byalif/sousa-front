import React, { useEffect, useState, useContext } from "react";
import TotalFooter from "./TotalFooter";
import "../Checkout.css";
import { AppContext } from "../index.js";

const Checkout = () => {
  const { cart, updateCart, isLoading, setIsLoading } = useContext(AppContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page on component mount
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const deleteItem = (productId) => {
    setIsLoading(true); // Set loading to true
    let newCart = cart.filter((item) => item.id !== productId);
    updateCart(newCart);
  };

  const initiateCheckout = () => {
    setIsLoading(true); // Simulating API request delay with setTimeout
    fetch("https://sousa.beatsbyalif.com/stripe/checkout/hosted", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cart.map((elem) => ({
          name: elem.name,
          id: elem.id,
        })),
        customerName: name,
        customerEmail: email,
      }),
    })
      .then((r) => r.text())
      .then((r) => {
        setIsLoading(false);
        window.location.href = r;
      });
  };

  return (
    <>
      <div
        style={{
          marginTop: `${cart.length === 0 ? "100px" : "200px"}`,
          justifyContent: `${cart.length === 0 ? "center" : ""}`,
          alignItems: `${cart.length === 0 ? "center" : ""}`,
        }}
        className="checkout-container"
      >
        <div className="customer-details">
          <h3>Customer Details</h3>

          <input
            style={{ width: "100%" }}
            type="text"
            placeholder="Name"
            value={name}
            onChange={onNameChange}
          />

          <input
            style={{ border: ".1px solid grey" }}
            type="email"
            placeholder="Email"
            value={email}
            onChange={onEmailChange}
          />

          {isLoading ? (
            <div className="loading-animation">Proceeding to checkout...</div>
          ) : (
            <button onClick={initiateCheckout} className="checkout-button">
              Checkout
            </button>
          )}
        </div>
        {cart.length === 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}
            className="empty-cart-message"
          >
            <i className="fas fa-shopping-cart"></i>
            <p>Cart is empty</p>
          </div>
        ) : (
          <>
            <div className="products-container">
              {cart.map((item) => (
                <div key={item.id} className="product-box">
                  <div
                    onClick={() => {
                      deleteItem(item.id);
                    }}
                    className="product-delete-icon"
                  >
                    <i className="fas fa-times"></i>
                  </div>

                  <img
                    src={item.img}
                    alt={item.name}
                    className="product-image"
                  />

                  <div className="product-details">
                    <h6 className="product-name">{item.name}</h6>

                    <h5 className="product-price">${item.price}</h5>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Checkout;
