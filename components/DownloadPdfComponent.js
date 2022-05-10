import React from "react";
export function Download(props) {
  return (
    <a
      className={props.className}
      rel="noreferrer"
      href="https://syntaxia.blob.core.windows.net/files/Syntaxia%202022%20(1).pdf"
      target="_blank"
    >
      {props.children}
    </a>
  );
}
