import React from "react";

export default function About() {
  return (
    <div>
      <div className="container">
        <div className="row">
          <ol className="col-12 mt-3 breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item active">Contact Us</li>
          </ol>
          <div className="col-12">
            <h3>About Us</h3>
            <hr />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row row-content" style={{ marginBottom: 50 }}>
          <h4>
            The CYBERNETICS ASSOCIATION of Department of Computer Science, St.
            Joseph's College Autonomous organizes an annual inter-collegiate
            cultural and technological extravaganza titled as SYNTAXIA 2021. It
            is a colossal of different tech based events compiled together to
            bring you the festival of computers right at your fingertips this
            year as it's happening online!
          </h4>
        </div>
      </div>
    </div>
  );
}
