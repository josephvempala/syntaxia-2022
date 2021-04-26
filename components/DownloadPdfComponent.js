import React from "react";
import Pdf from "./Brochure.pdf";
export function Download(props) {
  return (
    <a className={props.className} rel="noreferrer" href={Pdf} target="_blank">
      {props.children}
    </a>
  );
}
