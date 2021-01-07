import { FC } from "react";
import ReactDOM from "react-dom";

export const Portal: FC<{}> = ({ children }) => {
  return ReactDOM.createPortal(children, document.body);
};
