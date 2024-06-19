import "../Navbar.css";
import React, { useRef, useContext, useState, useEffect } from "react";
import { AppContext } from "../index.js"; // Assuming you exported CartContext from CartContext.js
import { useNavigate } from "react-router-dom";
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
  const [burgerOpen, setBurgerOpen] = useState(false);
  const nav = useNavigate();

  const handleBurgerToggle = () => {
    setBurgerOpen(!burgerOpen);
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
      setLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth > 902) {
        const currentScrollPos = window.pageYOffset;
        const isVisible = prevScrollPos > currentScrollPos;

        setPrevScrollPos(currentScrollPos);
        setVisible(isVisible);
      }
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

      if (window.innerWidth > 902) {
        setBurgerOpen(false);
      }
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

      <div
        style={{ display: `${burgerOpen ? "none" : ""}` }}
        className="navbar-nav"
      >
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

      <div
        style={{ display: `${window.innerWidth < 902 ? "flex" : "none"}` }}
        className={`burger-menu ${burgerOpen ? "open" : ""}`}
        onClick={handleBurgerToggle}
      >
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>

      <div className={`mobile-menu ${burgerOpen ? "open" : ""}`}>
        <a
          onClick={() => {
            window.scrollTo(0, 0);
            setBurgerOpen(!burgerOpen);
            nav("/about");
          }}
          style={{ cursor: "pointer", marginTop: "-80px" }}
          className="mobile-nav-item"
        >
          About
        </a>
        <a
          onClick={() => {
            window.scrollTo(0, 0);
            setBurgerOpen(!burgerOpen);
            nav("/programs");
          }}
          style={{ cursor: "pointer" }}
          className="mobile-nav-item"
        >
          Programs
        </a>
        <a
          onClick={() => {
            window.scrollTo(0, 0);
            setBurgerOpen(!burgerOpen);
            nav("/coaching");
          }}
          style={{ cursor: "pointer" }}
          className="mobile-nav-item"
        >
          Coaching
        </a>
        {isLoggedIn && (
          <a href="/products" className="mobile-nav-item">
            Products
          </a>
        )}
        {user?.role?.name === "ADMIN" && (
          <>
            <a
              onClick={() => {
                window.scrollTo(0, 0);
                setBurgerOpen(!burgerOpen);
                nav("/inquiries");
              }}
              style={{ cursor: "pointer" }}
              className="mobile-nav-item"
            >
              Inquiries
            </a>
            <a
              onClick={() => {
                window.scrollTo(0, 0);
                setBurgerOpen(!burgerOpen);
                nav("/invoices");
              }}
              style={{ cursor: "pointer" }}
              className="mobile-nav-item"
            >
              Invoices
            </a>

            <a
              onClick={() => {
                window.scrollTo(0, 0);
                setBurgerOpen(!burgerOpen);
                nav("/questions");
              }}
              style={{ cursor: "pointer" }}
              className="mobile-nav-item"
            >
              Questions
            </a>
          </>
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
            className="mobile-nav-item"
          >
            Sign out
          </a>
        ) : (
          <a
            onClick={() => {
              window.scrollTo(0, 0);
              setBurgerOpen(!burgerOpen);
              nav("/signin");
            }}
            style={{ cursor: "pointer" }}
            className="mobile-nav-item"
          >
            Sign in
          </a>
        )}
        <a
          onClick={() => {
            window.scrollTo(0, 0);
            setBurgerOpen(!burgerOpen);
            nav("/checkout");
          }}
          style={{ cursor: "pointer" }}
          className="mobile-nav-item"
        >
          <i className="fas fa-shopping-cart"></i>
          {cartLength >= 0 && (
            <span className="cart-length2">{cartLength}</span>
          )}
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
