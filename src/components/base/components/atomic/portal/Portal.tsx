import React from "react";
import ReactDOM from "react-dom";

export const Portal: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return ReactDOM.createPortal(children, document.body);
};
