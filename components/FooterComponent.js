import React from "react";
import Link from "next/link";
export default function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-4 offset-1 col-sm-2">
            <h5>Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="col-7 col-sm-5">
            <h5>Our Address</h5>
            <address>
              St. Joseph's College
              <br />
              36, Langford Rd,
              <br />
              Langford Gardens, Bengaluru,
              <br />
              Karnataka 560027
              <br />
              <i className="icon-phone fa-lg"></i>: +910000000000
              <br />
              <i className="icon-envelope fa-lg"></i>:
              <a className="btn" href="mailto:cybernetics.sjc@gmail.com">
                cybernetics.sjc@gmail.com
              </a>
            </address>
          </div>
          <div className="col-12 col-sm-4 align-self-center">
            <div className="text-center">
              <a
                className="btn btn-social-icon btn-instagram"
                href="http://instagram.com/+"
              >
                <i className="icon-instagram"></i>
              </a>
              <a
                className="btn btn-social-icon"
                href="mailto:cybernetics.sjc@gmail.com"
              >
                <i className="icon-envelope-o"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
