import React, { useState, useEffect } from "react";
import axios from "axios";
import "../ClientInquiries.css"; // Import your CSS file

const ClientInquiries = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [inquiries, setInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://sousa.beatsbyalif.com/mail/allResultsGroupedByInquiryId"
        );
        setInquiries(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Set loading to false in case of an error
      }
    };

    fetchData();
  }, []); // Empty dependency array to run effect only once when component mounts

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredInquiries = inquiries.filter((inquiry) => {
    return (
      inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.inquiryId.toString().includes(searchTerm.toLowerCase()) ||
      inquiry.results.some(
        (result) =>
          result.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          result.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  });

  return (
    <div className="client-inquiries-page">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search inquiries..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <a href="#" className="search-icon">
          <i className="fa fa-search"></i>
        </a>
      </div>
      <div className="client-inquiries-container">
        {isLoading ? (
          <div className="loading-animation">Loading...</div>
        ) : (
          filteredInquiries.map((inquiry) => (
            <div key={inquiry.inquiryId} className="inquiry">
              <div className="inquiry-header">
                <h2>Inquiry #{inquiry.inquiryId}</h2>

                <p>{inquiry.email}</p>
                <p className="date">{inquiry.date}</p>
              </div>
              <div className="client-results">
                {inquiry.results.map((result, index) => (
                  <div key={index} className="result">
                    <h3>{result.question}</h3>
                    <p>{result.answer}</p>
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

export default ClientInquiries;
