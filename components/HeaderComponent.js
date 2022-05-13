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
          <img
            height="40"
            width="40"
            src={"./assets/images/sjc-logo.png"}
          ></img>
          <span className="ml-3">St Joseph's College</span>
        </NavbarBrand>
        <Collapse isOpen={isNavOpen} navbar>
          <Nav navbar className="ml-auto">
            <NavItem>
              <Link href="/">
                <a className="nav-link">
                  <span className="fa fa-home fa-lg"> Home</span>
                </a>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/about">
                <a className="nav-link">
                  <span className="fa fa-book fa-lg"> About</span>
                </a>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/contact">
                <a className="nav-link">
                  <span className="fa fa-address-card fa-lg"> Contact</span>
                </a>
              </Link>
            </NavItem>
            <NavItem>
              <Download className="nav-link">
                <span className="fa fa-newspaper-o fa-lg"> Brochure</span>
              </Download>
            </NavItem>
            <NavItem>
              <Link href="/register">
                <a className="nav-link">
                  <span className="fa fa-address-card fa-lg">
                    {" "}
                    Event Registration
                  </span>
                </a>
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <Jumbotron>
        <div className="row row-content row-no-gutters">
          <div className="col-sm-4 align-self-center">
            <img
              className="center-img cybernetics"
              src={"./assets/images/cybernetics-logo.png"}
              alt="Cybernetics Logo"
            />
          </div>
          <div className="col-sm-4 align-self-center">
            <h3 className="center-text sequel">
              St.Joseph's College Autonomous
            </h3>
            <br />
            <h3 className="center-text sequel">Cybernetics Association</h3>
            <br />
            <h5 className="center-text">
              <i>Presents</i>
            </h5>
            <br />
            <h1 className="center-text forma">SYNTAXIA 2022</h1>
          </div>
          <div className="col-sm-4 align-self-center">
            <img
              className="center-img"
              src={"./assets/images/syntaxia-logo.png"}
              alt="Syntaxia Logo"
            />
          </div>
        </div>
      </Jumbotron>
    </React.Fragment>
  );
};

export default HeaderComponent;
