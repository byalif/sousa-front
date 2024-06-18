import React from "react";

function CartItem(props) {
  // Function to generate a random dark matte linear gradient
  const generateRandomGradient = () => {
    const hue = Math.floor(Math.random() * 360); // Random hue
    const saturation = Math.floor(Math.random() * 20 + 60); // Random saturation (60-80)
    const lightness = Math.floor(Math.random() * 20 + 20); // Random lightness (20-40)
    return `linear-gradient(to right, hsl(${hue}, ${saturation}%, ${lightness}%), hsl(${hue}, ${saturation}%, ${lightness}%))`;
  };

  const gradientStyle = {
    backgroundImage: generateRandomGradient(),
    color: "white",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
  };

  return (
    <div className="box" style={gradientStyle}>
      <h2>{props.data.name}</h2>
      <p>{props.data.description}</p>
      {props.mode === "checkout" && <p>{"Quantity: " + props.data.quantity}</p>}
      <p style={{ color: "blue", fontSize: "1.2rem" }}>
        {"$" + props.data.price}
      </p>
    </div>
  );
}

export default CartItem;
