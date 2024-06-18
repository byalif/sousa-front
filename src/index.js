import React, { useEffect, useState, createContext } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./App.css";
import prod1 from "./p1.jpeg";
import prod2 from "./p2.jpeg";
import prod3 from "./p3.jpeg";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState(
    localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    // Retrieve loggedIn state from local storage
    const storedLoggedIn = localStorage.getItem("loggedIn");
    if (storedLoggedIn) {
      setLoggedIn(JSON.parse(storedLoggedIn));
    }

    // Retrieve user object from local storage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Function to update the cart
  const updateCart = (newCart) => {
    setCart((old) => {
      setIsLoading(false);
      return newCart;
    });
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setLoggedIn,
        cart,
        updateCart,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AppProvider>
    <App />
  </AppProvider>
);
