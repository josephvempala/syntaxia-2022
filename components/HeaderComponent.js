import React, { useState } from "react";
import { Download } from "./DownloadPdfComponent";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem,
  Jumbotron,
} from "reactstrap";

import Link from "next/link";

const HeaderComponent = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  return (
    <React.Fragment>
      <Navbar dark expand="md" className="bg-purple">
        <NavbarToggler
          onClick={() => {
            setIsNavOpen(!isNavOpen);
          }}
        />
        <NavbarBrand className="ml-auto" href="/">
          <span>Cybernetics Association</span>
        </NavbarBrand>
        <Collapse isOpen={isNavOpen} navbar>
          <Nav navbar className="ml-auto">
            <NavItem>
              <Link className="nav-link" href="/">
                <span className="icon-home fa-lg">Home</span>
              </Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" href="/about">
                <span className="icon-info fa-lg">About</span>
              </Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" href="/contact">
                <span className="icon-address-card fa-lg">Contact</span>
              </Link>
            </NavItem>
            <NavItem>
              <Download className="nav-link">
                <span className="icon-newspaper-o fa-lg">Brochure</span>
              </Download>
            </NavItem>
            <NavItem>
              <Link className="nav-link" href="/register">
                <span className="icon-address-card fa-lg">
                  Events/Registration
                </span>
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <Jumbotron>
        <div className="row row-content row-no-gutters">
          <div className="col-sm-4 align-self-center">
            <img
              className="center-img"
              src={"/assets/images/cybernetics-logo.png"}
              alt="Cybernetics Logo"
            />
          </div>
          <div className="col-sm-4 align-self-center">
            <h2 className="center-text sequel">Cybernetics Association</h2>
            <br />
            <h5 className="center-text">
              <i>Presents</i>
            </h5>
            <br />
            <h1 className="center-text forma">SYNTAXIA 2021</h1>
          </div>
          <div className="col-sm-4 align-self-center">
            <img
              className="center-img"
              src={process.env.PUBLIC_URL + "images/syntaxia-logo.png"}
              alt="Syntaxia Logo"
            />
          </div>
        </div>
      </Jumbotron>
    </React.Fragment>
  );
};

export default HeaderComponent;
