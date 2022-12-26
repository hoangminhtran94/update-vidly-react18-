import React from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";
import { CSSTransition } from "react-transition-group";
const Backdrop: React.FC<{
  onClick: React.UIEventHandler;
}> = ({ onClick }) =>
  ReactDOM.createPortal(
    <div onClick={onClick} className={classes["backdrop"]}></div>,
    document.getElementById("modal-hook")!
  );
const ModalBox: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return ReactDOM.createPortal(
    <div className={classes["overlay"]}>{children}</div>,
    document.getElementById("modal-hook")!
  );
};
const Modal: React.FC<{
  toggle: boolean;
  children: React.ReactNode;
  onClick: React.UIEventHandler;
}> = ({ children, onClick, toggle }) => {
  return (
    <>
      {toggle && <Backdrop onClick={onClick} />}
      <CSSTransition
        in={toggle}
        mountOnEnter
        unmountOnExit
        timeout={300}
        classNames="modal"
      >
        <ModalBox>{children}</ModalBox>
      </CSSTransition>
    </>
  );
};
export default Modal;
