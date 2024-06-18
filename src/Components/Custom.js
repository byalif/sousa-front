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
                <img className="img-fluid" src={Recent1} alt="" />
              </div>
            </div>
            <div className="col-sm-4">
              <div className="box">
                <img className="img-fluid" src={Recent2} alt="" />
              </div>
            </div>
            <div className="col-sm-4">
              <div className="box">
                <img className="img-fluid" src={Recent3} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Custom;
