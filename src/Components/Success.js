import React, { useEffect, useContext, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import "../Success.css";
import { AppContext } from "../index.js";

function Success() {
  const [loading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null); // State to hold error message
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const email = queryParams.get("email");
  const sessionId = queryParams.get("session_id");
  const navigate = useNavigate();

  useEffect(() => {
    if (token && email && sessionId) {
      fetch(
        `http://a6ec00542b65a4179ad8913259a961e3-956403552.us-east-2.elb.amazonaws.com/stripe/sendEmail?sessionId=${sessionId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            email: token,
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.message && data.message === "INVALID_TOKEN") {
            setIsLoading(false);
            setErrorMessage("The link is expired. Please try again.");
          } else {
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [token, email, sessionId]);

  const onButtonClick = () => {
    navigate("/");
  };

  return (
    <div className="success-container">
      {loading ? (
        <div style={{ fontSize: "18px" }} className="loading-animation">
          Processing...
        </div>
      ) : (
        <div>
          {errorMessage === null && <h1>Thank You for Your Purchase!</h1>}
          {errorMessage === null && (
            <p>
              We appreciate your business. Your purchase has been successfully
              completed. Please check your email for the receipt and details of
              the products you've bought.
            </p>
          )}
          {errorMessage ? (
            <div className="error-container">
              <i className="fas fa-ghost error-icon"></i>
              <p className="error-message">{errorMessage}</p>
            </div>
          ) : (
            <Link to="/products" className="view-products-button">
              View Products
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export default Success;
