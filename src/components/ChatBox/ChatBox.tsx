import { Form } from "react-bootstrap";
import classes from "./ChatBox.module.css";
import Button from "react-bootstrap/Button";
import { CSSTransition } from "react-transition-group";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { chatboxActions } from "./../../store/chatbox";
import ChatBoxMessage from "../ChatBoxMessage/ChatBoxMessage";
const ChatBox = () => {
  const toggle = useSelector<RootState, boolean>(
    (state) => state.chatbox.toggle
  );
  const dispatch = useDispatch();
  return (
    <CSSTransition
      in={toggle}
      classNames="chatbox"
      timeout={300}
      unmountOnExit
      mountOnEnter
    >
      <div className={classes["chax-box"] + " rounded shadow"}>
        <div
          className={
            classes["header-row"] +
            " bg-secondary p-2 text-white d-flex justify-content-between"
          }
        >
          <p className="m-0"> Chat box</p>
          <Button
            className="h-25"
            size="sm"
            variant="danger"
            onClick={() => {
              dispatch(chatboxActions.setToggleChatBox());
            }}
          ></Button>
        </div>
        <div className={classes["content-row"]}>
          <ChatBoxMessage type="send" />
          <ChatBoxMessage type="receive" />
        </div>
        <div className={classes["action-row"]}>
          <Form.Control name="Input" as="input" />
          <Button className="d-flex align-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-arrow-right-circle"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
              />
            </svg>
          </Button>
        </div>
      </div>
    </CSSTransition>
  );
};

export default ChatBox;
