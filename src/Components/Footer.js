import React from "react";
import "../Footer.css";

const Footer = () => {
  return (
    <>
      <footer>
        <div class="footer-container">
          <div class="footer-left">
            <h3>ABOUT ME</h3>
            <p>
              I'm thrilled to be part of your fitness journey, where we'll work
              together to unlock your full potential and achieve your health and
              wellness goals.
            </p>
          </div>
          <div class="footer-center">
            <h3>CONTACT</h3>
            <p>Queens NY, USA</p>
            <p>Email: alifrahi22@gmail.com</p>
            <p>Phone: 3478630546</p>
          </div>
          <div class="footer-right">
            <h3>WEEKLYS</h3>
            <div class="subscribe">
              <div className="up">
                <i class="fas fa-envelope"></i>
                <span>Stay up to date with sousaesthetic</span>
              </div>
              <input type="email" placeholder="Enter your e-mail" />
              <button>Sign Up</button>
            </div>
          </div>
        </div>
        <div class="copyright">
          <hr style={{ backgroundColor: "white", margin: "20px 0" }} />
          <p>&copy; 2024 alifthenics. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
