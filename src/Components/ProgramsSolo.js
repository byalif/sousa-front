import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Pricing.css";
import { AppContext } from "../index.js";
import prod1 from "../p1.jpeg";
import prod2 from "../p2.jpeg";
import prod3 from "../p3.jpeg";

const ProgramsSolo = () => {
  const { cart, updateCart } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const history = useNavigate();

  const products = [
    {
      id: "30",
      img: "https://sousa.s3.amazonaws.com/p1.jpeg",
      name: "30 Day Strength Surge",
      price: 30,
      description:
        "Transform your body in just 30 days with our Strength Surge program. Build muscle, increase endurance, and feel stronger than ever. Our comprehensive plan combines effective workouts with personalized guidance to help you achieve your fitness goals efficiently.",
    },
    {
      id: "60",
      img: "https://sousa.s3.amazonaws.com/p2.jpeg",
      name: "8 Week Muscle Mastery",
      price: 60,
      description:
        "Master the art of muscle building in just 8 weeks with our Muscle Mastery program. Whether you're a beginner or an experienced lifter, our scientifically designed workouts and nutrition plan will help you pack on lean muscle mass and redefine your physique.",
    },
    {
      id: "90",
      img: "https://sousa.s3.amazonaws.com/p3.jpeg",
      name: "12 Week Bulk & Sculpt",
      price: 90,
      description:
        "Bulk up and sculpt your body with our 12 Week Bulk & Sculpt program. Tailored for individuals seeking significant muscle gains and definition, our program offers a balanced approach to training and nutrition to help you achieve your desired physique.",
    },
  ];

  const buyNow = (productId) => {
    setIsLoading(true);
    setTimeout(() => {
      const product = products.find((item) => item.id === productId);
      if (product) {
        const existingItem = cart.find((item) => item.id === productId);
        if (!existingItem) {
          updateCart([...cart, product]);
        }
      }
      setIsLoading(false);
      history("/checkout");
    }, 300);
  };

  return (
    <>
      <div className="solo pricing container">
        <div className="row row-cols-1 row-cols-md-3">
          {isLoading && <p>Loading...</p>}
          {!isLoading &&
            products.map((product) => (
              <div key={product.id} className="col">
                <div style={{ width: "100%" }} className="box ">
                  <h6>{product.name}</h6>
                  <h5>${product.price}</h5>
                  <p>{product.description}</p>
                  <button
                    style={{ width: "100%" }}
                    className="btn"
                    onClick={() => buyNow(product.id)}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default ProgramsSolo;
