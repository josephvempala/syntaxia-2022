import React from "react";
export function Download(props) {
  return (
    <a
      className={props.className}
      rel="noreferrer"
      href="https://syntaxia-2021.s3.us-east-2.amazonaws.com/brochure-syntaxia.pdf"
      target="_blank"
    >
      {props.children}
    </a>
  );
}
