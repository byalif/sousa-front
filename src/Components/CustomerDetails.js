import React, { useState } from "react";

function CustomerDetails(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onCustomerNameChange = (ev) => {
    setName(ev.target.value);
  };

  const onCustomerEmailChange = (ev) => {
    setEmail(ev.target.value);
  };

  const initiatePayment = () => {
    setIsLoading(true);
    let obj = JSON.stringify({
      items: props.data.map((elem) => ({ name: elem.name, id: elem.id })),
      customerName: name,
      customerEmail: email,
    });
    console.log(obj);
    fetch(
      "https://a6ec00542b65a4179ad8913259a961e3-956403552.us-east-2.elb.amazonaws.com/stripe/" +
        props.endpoint,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: props.data.map((elem) => ({ name: elem.name, id: elem.id })),
          customerName: name,
          customerEmail: email,
        }),
      }
    )
      .then((r) => r.text())
      .then((r) => {
        setIsLoading(false);
        window.location.href = r;
      });
  };

  return (
    <div className="customer-details">
      <h4>Customer Details</h4>
      <div className="input-group">
        <label htmlFor="customer-name">Name:</label>
        <input
          type="text"
          id="customer-name"
          placeholder="Enter your name"
          onChange={onCustomerNameChange}
          value={name}
        />
      </div>
      <div className="input-group">
        <label htmlFor="customer-email">Email:</label>
        <input
          type="email"
          id="customer-email"
          placeholder="Enter your email"
          onChange={onCustomerEmailChange}
          value={email}
        />
      </div>

      {isLoading ? ( // Display loading animation if isLoading is true
        <div style={{ fontSize: "18px" }} className="loading-animation">
          Proceeding to checkout...
        </div>
      ) : (
        <button onClick={initiatePayment} className="checkout-button">
          Checkout
        </button>
      )}
    </div>
  );
}

export default CustomerDetails;
