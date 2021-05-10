import React from "react";
export function Download(props) {
  return (
    <a
      className={props.className}
      rel="noreferrer"
      href="https://syntaxia-2021.s3.us-east-2.amazonaws.com/Official_Brochure_SYNTAXIA_2021.pdf"
      target="_blank"
    >
      {props.children}
    </a>
  );
}
