import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Invoice.css"; // Import your CSS file

const Invoice = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://a6ec00542b65a4179ad8913259a961e3-956403552.us-east-2.elb.amazonaws.com/mail/allProductsByReceiptId"
        );
        setInvoices(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchData();
  }, []); // Empty dependency array to run effect only once when component mounts

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredInvoices = invoices.filter((invoice) => {
    return (
      invoice.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.receiptId.toString().includes(searchTerm.toLowerCase()) ||
      invoice.products.some(
        (product) =>
          product.productName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          product.currency.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  });

  return (
    <div className="full-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search invoices..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <a href="#" className="search-icon">
          <i className="fa fa-search"></i>
        </a>
      </div>
      <div className="invoice-container">
        {loading ? (
          <div className="loading-animation">Loading...</div>
        ) : (
          filteredInvoices.map((invoice) => (
            <div key={invoice.receiptId} className="invoice">
              <div className="invoice-header">
                <h2>Receipt #{invoice.receiptId}</h2>
                <p>Email: {invoice.email}</p>
                <p className="date">Date: {invoice.date}</p>
              </div>

              <div className="product-details">
                {invoice.products.map((product) => (
                  <div key={product.id} className="product">
                    <h3>{product.productName}</h3>
                    <p>Quantity: {product.quantity}</p>
                    <p>
                      Amount: {product.amount} {product.currency}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Invoice;
