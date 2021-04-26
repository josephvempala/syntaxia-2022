import React from "react";
import { Spinner } from "reactstrap";

const MySpinner = () => {
  return (
    <div className="d-flex justify-content-center align-items-center mt-10">
      <Spinner style={{ width: "2rem", height: "2rem" }} />
    </div>
  );
};

export default MySpinner;
