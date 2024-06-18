import React from "react";
import { useNavigate } from "react-router-dom";
import "../Header.css";
import gifImage from "../sous7.jpeg";

const Header = () => {
  const nav = useNavigate();
  return (
    <>
      <section>
        <div className="header">
          <div>
            <div className="img">
              <img src="https://sousa.s3.us-east-1.amazonaws.com/sous7.jpeg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLWVhc3QtMSJHMEUCIQD3w23ib2uktmVXgKf10db0BTAlVGxfm9dFikNVYefWwgIgbP1ex8AGaYj0hAXdDDR8%2F%2BEuPfeyboVbcV3zgV4Dwkwq5AIIEhAAGgwyNDYyMTE2MTUxNjEiDLaDlVhJtu%2Fvd%2BFZ0yrBAmJNX%2FjykV08S4FoGYLAthpoqVrYmB%2FKRoqC1txB37IgdsuApDKrMvYBVsvPbJkWB3yqtsbW4XINp1WcawcG3v%2BYW9DpJzmXHvpG8PPLX7Nl3CNMrlo%2Fpymu3OUHSxkdUPbZIwozkzzNSZPJ%2BUwSlY4pVMQFdp1qVnZu%2BMGXgE6iYAW8V5odZioAOjL27lP6LCnxaHKkCEPsyAcmG1bK%2FwQlKD0ohakgN1iv67C%2FU92NHE7Xu6NhfASNzfx5FWHdJzU%2FQtiz66TLNlXwdu%2FHKW1uyvW1V0Cnv%2FlO1azuVpselrZ9b3a6dwEJw%2BEgSBc1yuiCqYg%2BsNUKjhlYMGSHYoji2FROeNDWmEY9D%2B1BHAW2DEUTi%2BKLSI1B21d8lTdF34ak0aJ9CblYkHavV3wCoc4p1qtj66b5QQo78%2BZ3c6BGLTC7iMWzBjqzApfOKGqwnEGlNjjfVx7wCidHDlc%2FeDF5srWWLKuC8LczYVTwCqhbsnJk%2BUVCMkw0NUyFWDQ59CsbbnbjjlDYj1EBhQcrpUDqmlL9ENj2fdSOqvWtm%2BaacsF6yt%2BW1oD352krUbU%2FZtPUnUszVAWCyZGM81P%2FRjrwWKfF4PfSE%2FdlYZuXlDgK6nkl4iLI%2B64OCbOd2hDBGiPgi9k%2FMi2MsKuQ2ucDQcHRQYwZTuBRNqWTR%2B7BaKK1cFD5SbGU6lsws6FSZfA%2BVu5vCemLGwhxnhavGuRjxTmL0ZsQp%2FyVOGG9vCSfnCBUlZrLi70Z1I5yTsYR3tp3YX3vwVbzBxPSLAZbrUeMBZNre%2BJCPza5SFXUfaqc8MW3%2BoWwXyu%2FG57%2Bu5zbpVaoj6sKayyByS6yC9Hwnjs%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240618T085137Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIATSU23DG44FWQFRZP%2F20240618%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=2f4b977d20082838b72762bbc54f0635e8ffb1e1dae5623ffffe6653683fa74e" />
            </div>
          </div>
          <div className="content">
            <h6>
              Build Your Fitness World <br /> By Building Your Body
            </h6>
            <button
              onClick={() => {
                window.location = "/coaching";
              }}
              className="btn"
            >
              Join Now
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;
