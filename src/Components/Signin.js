// SignIn.js
import React, { useState, useContext } from "react";
import "../SignIn.css";
import axios from "axios";
import { AppContext } from "../index.js";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { setUser, setLoggedIn } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        "https://sousa.beatsbyalif.com/auth/login",
        {
          email: email,
          password: password,
        }
      );

      // Assuming the response contains the user details and token
      const { user, token } = response.data;

      // Save the token to localStorage
      localStorage.setItem("jwtToken", token);
      console.log(response);
      window.location = "/";
      // Update the user context
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      setLoggedIn(true);

      console.log("Sign-in successful!");
    } catch (err) {
      setError("Invalid email or password");
      console.error("Sign-in error:", err);
    }
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <hr />
      <div className="mine">
        <form onSubmit={handleSubmit} className="signin-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="signin-button">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
