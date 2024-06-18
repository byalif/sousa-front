import React from "react";
import { useNavigate } from "react-router-dom";
import "../Header.css";
import gifImage from "../sous7.jpeg";

const Header = () => {
  const nav = useNavigate();
  return (
    <>
      <section>
        <div className="header">
          <div>
            <div className="img">
              <img src={gifImage} />
            </div>
          </div>
          <div className="content">
            <h6>
              Build Your Fitness World <br /> By Building Your Body
            </h6>
            <button
              onClick={() => {
                window.location = "/coaching";
              }}
              className="btn"
            >
              Join Now
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;
