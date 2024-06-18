import React from "react";
import Recent3 from "../sous10.jpeg";
import Recent2 from "../sous9.jpeg";
import Recent1 from "../sous12.jpeg";
import "../Custom.css";

const Custom = () => {
  return (
    <>
      <section>
        <div className="custom container">
          <div className="row">
            <div className="col-sm-4">
              <div className="box">
                <img
                  className="img-fluid"
                  src="https://sousa.s3.amazonaws.com/sous12.jpeg"
                  alt=""
                />
              </div>
            </div>
            <div className="col-sm-4">
              <div className="box">
                <img
                  className="img-fluid"
                  src="https://sousa.s3.amazonaws.com/sous9.jpeg"
                  alt=""
                />
              </div>
            </div>
            <div className="col-sm-4">
              <div className="box">
                <img
                  className="img-fluid"
                  src="https://sousa.s3.amazonaws.com/sous10.jpeg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Custom;
