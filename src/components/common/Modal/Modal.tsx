import React from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";
import { CSSTransition } from "react-transition-group";
import { useState } from "react";

const Modal: React.FC<{
  className?: string;
  toggle: boolean;
  children: React.ReactNode;
  onClick: React.UIEventHandler;
}> = ({ children, onClick, toggle, className }) => {
  const [entered, setEntered] = useState(false);
  return ReactDOM.createPortal(
    <CSSTransition
      key={"modal"}
      in={toggle}
      mountOnEnter
      unmountOnExit
      timeout={300}
      classNames="fade"
      onEntered={() => {
        setEntered(true);
      }}
      onExiting={() => {
        setEntered(false);
      }}
    >
      <div className={classes["backdrop"]}>
        <div
          className=" absolute top-0 left-0 w-full h-full  "
          onClick={onClick}
        />
        <CSSTransition
          key={"children"}
          in={entered}
          mountOnEnter
          unmountOnExit
          timeout={300}
          classNames="modal"
        >
          <div className={`${classes["overlay"]} ${className}`}>{children}</div>
        </CSSTransition>
      </div>
    </CSSTransition>,
    document.getElementById("modal-hook")!
  );
};
export default Modal;
