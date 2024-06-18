import "../Navbar.css";
import React, { useRef, useContext, useState, useEffect } from "react";
import { AppContext } from "../index.js"; // Assuming you exported CartContext from CartContext.js

const Navbar = () => {
  const [defaultWidth, setWidth] = useState(window.innerWidth);
  const [isShaking, setIsShaking] = useState(false);
  const { cart, updateCart, setLoggedIn, userRole, isLoggedIn, user, setUser } =
    useContext(AppContext);
  const [cartLength, setCartLength] = useState(0);
  const [showMenu1, setShowMenu1] = useState(false);
  const [showMenu2, setShowMenu2] = useState(false);

  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);
  const dropdownRef1 = useRef(null);
  const dropdownRef2 = useRef(null);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
      setLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isVisible = prevScrollPos > currentScrollPos;

      setPrevScrollPos(currentScrollPos);
      setVisible(isVisible);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  useEffect(() => {
    // Calculate cart item length
    setCartLength(cart.length);
  }, [cart]);

  const handleToggleMenu1 = () => {
    setShowMenu1(!showMenu1);
  };

  const handleToggleMenu2 = () => {
    setShowMenu2(!showMenu2);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
      }, 1000); // Shake effect for 1 second
    };

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures that this effect runs only once on component mount

  useEffect(() => {
    // Add event listener to detect clicks outside of the dropdown menu
    const handleClickOutside = (event) => {
      if (
        dropdownRef1.current &&
        !dropdownRef1.current.contains(event.target)
      ) {
        setShowMenu1(false);
      }
      if (
        dropdownRef2.current &&
        !dropdownRef2.current.contains(event.target)
      ) {
        setShowMenu2(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className={`navbar ${visible ? "visible" : "hidden"}`}>
      <div>
        <a href="/" className="navbar-brand">
          sousaesthetic<span>s.</span>co<span>m.</span>
        </a>
        <div className={`image ${isShaking ? "shake" : ""}`}></div>
      </div>

      <div className="navbar-nav">
        {user?.role?.name === "ADMIN" ? (
          <div className="admin-menu">
            <div className="nav-item-admin dropdown" ref={dropdownRef2}>
              <button className="dropbtn joke" onClick={handleToggleMenu2}>
                Dashboard
                <i className={`fas fa-caret-${showMenu2 ? "up" : "down"}`}></i>
              </button>
              {showMenu2 && (
                <div className="dropdown-content">
                  <a href="/inquiries">Inquiries</a>
                  <a href="/invoices">Invoices</a>
                  <a href="/subscribers">Subscribers</a>
                  <a href="/questions">Questions</a>
                </div>
              )}
            </div>
            <div className="nav-item-admin dropdown" ref={dropdownRef1}>
              <button className="dropbtn joke" onClick={handleToggleMenu1}>
                Analytics
                <i className={`fas fa-caret-${showMenu1 ? "up" : "down"}`}></i>
              </button>
              {showMenu1 && (
                <div className="dropdown-content">
                  <a href="/questions">Profile</a>
                  <a href="/metrics">Metrics</a>
                  <a href="/traffic">Traffic</a>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div style={{ display: "flex" }}>
            <a href="/about" className="nav-item">
              About
            </a>
            <a href="/programs" className="nav-item">
              Programs
            </a>{" "}
            <a href="/coaching" className="nav-item">
              Coaching
            </a>{" "}
            {isLoggedIn && (
              <a href="/products" className="nav-item cart-icon">
                Products
              </a>
            )}
          </div>
        )}
        {isLoggedIn ? (
          <a
            style={{ cursor: "pointer" }}
            onClick={() => {
              localStorage.removeItem("user");
              localStorage.removeItem("jwtToken");
              setTimeout(() => {
                window.location = "/";
              }, 100);
            }}
            className="nav-item"
          >
            Sign out
          </a>
        ) : (
          <a href="/signin" className="nav-item">
            Sign in
          </a>
        )}
        <a href="/checkout" className="nav-item cart-icon">
          <i className="fas fa-shopping-cart"></i>
          {cartLength >= 0 && <span className="cart-length">{cartLength}</span>}
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
