import React from "react";

export default function Contact() {
  return (
    <div className="container">
      <div
        className="row row-content justify-content-center"
        style={{ marginBottom: 50, marginTop: 50 }}
      >
        <div className="col-12">
          <h3>Location Information</h3>
        </div>
        <div className="col-7 col-sm-5">
          <h5>Our Address</h5>
          <address>
            36, Langford Rd,
            <br />
            Langford Gardens, Bengaluru,
            <br />
            Karnataka 560027
            <br />
            <i className="fa fa-phone fa-lg"></i>: +910000000000
            <br />
            <i className="fa fa-envelope-o fa-lg"></i>:
            <a href="mailto:cybernetics.sjc@gmail.com">
              cybernetics.sjc@gmail.com
            </a>
          </address>
        </div>
        <div className="col-12 col-sm-11 offset-sm-0">
          <div className="btn-group my-2" role="group">
            <a
              role="button"
              className="btn btn-primary"
              href="tel:+910000000000"
            >
              <i className="fa fa-phone"></i> Call
            </a>
            <a
              role="button"
              className="btn btn-success"
              href="mailto:cybernetics.sjc@gmail.com"
            >
              <i className="fa fa-envelope-o"></i> Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
