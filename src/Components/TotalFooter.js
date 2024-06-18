import React from "react";
import "../Totalfooter.css"; // Make sure to create this CSS file for styling

function TotalFooter(props) {
  return (
    <>
      <hr />
      <div className="total-footer">
        <span className="total-text">Total: </span>

        <span className="total-price">
          {" "}
          <i className="fas fa-dollar-sign"></i>
          {props.total}
        </span>
      </div>
      {props.mode === "subscription" && (
        <p className="total-footer-message">(Monthly, starting today)</p>
      )}
      {props.mode === "trial" && (
        <p className="total-footer-message">(Monthly, starting next month)</p>
      )}
    </>
  );
}

export default TotalFooter;
