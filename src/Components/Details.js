import React, { useState, useEffect } from "react";
import "../Details.css";
import theimg from "../sou16.png";
import theimg2 from "../sous11.jpeg";

const Details = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <div className="container details">
        <div className="row">
          <div className="thePara col-sm-5 k">
            <h6 className="ttle">There is No Tommorow</h6>
            <p>
              Welcome to sousaesthetics, where passion and dedication fuel
              results. I am committed to guiding you on your journey to
              greatness, helping you unlock your full potential and achieve your
              fitness goals. With personalized programs, state-of-the-art
              equipment, and unwavering support, I am here to empower you to
              thrive in every aspect of your wellness journey. Join me today and
              take the first step towards a healthier, stronger, and happier
              you!"
            </p>
            <button className="btn2">View More</button>
          </div>
          <div className="otherPara col-sm-5">
            {windowWidth > 759 ? (
              <img
                style={{ height: "80%" }}
                src="https://sousa.s3.amazonaws.com/sou16.png"
              />
            ) : (
              <img
                style={{
                  height: "60%",
                  marginTop: "60px",
                }}
                src="https://sousa.s3.amazonaws.com/sous11.jpeg"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
