import React from "react";
import { Image } from "react-bootstrap";
import classes from "./ChatBoxMessage.module.css";

interface ChatBoxMessageProps {
  type: "send" | "receive";
}
const ChatBoxMessage: React.FC<ChatBoxMessageProps> = ({ type }) => {
  return (
    <div className={classes["chatbox"] + " rounded"}>
      {type === "send" && (
        <div className="col-1">
          <Image
            src="http://localhost:5000/storage/images/1eededab-f575-4dce-81e1-16946479d6e3.jpeg"
            roundedCircle
            className={classes["image-icon"] + " shadow-sm"}
          />
        </div>
      )}
      <div
        className={`col-11 shadow-sm p-2 ${classes["chatbox-message"]} ${
          type === "send" ? classes["send-message"] : classes["receive-message"]
        }`}
      >
        <p className={classes["message-row"]}>
          Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello
          Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello{" "}
        </p>

        <p className={classes["time-row"]}>
          8:00am{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-check"
            viewBox="0 0 16 16"
          >
            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
          </svg>
        </p>
      </div>
      {type === "receive" && (
        <div className="col-1 d-flex justify-content-center">
          <Image
            src="http://localhost:5000/storage/images/1eededab-f575-4dce-81e1-16946479d6e3.jpeg"
            roundedCircle
            className={classes["image-icon"] + " shadow-sm"}
          />
        </div>
      )}
    </div>
  );
};

export default ChatBoxMessage;
