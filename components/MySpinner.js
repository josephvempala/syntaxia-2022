import React from "react";
import { Spinner } from "react-bootstrap";

const MySpinner = () => {
  return (
    <div className="d-flex justify-content-center align-items-center mt-10">
      <Spinner animation="border" role="status">
        <span className="sr-only ">Loading...</span>
      </Spinner>
    </div>
  );
};

export default MySpinner;
