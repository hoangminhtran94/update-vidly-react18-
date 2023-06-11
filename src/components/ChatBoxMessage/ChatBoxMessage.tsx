import React from "react";
import { Image } from "react-bootstrap";
import classes from "./ChatBoxMessage.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { User } from "../../store/models/User.models";
import { Message } from "../../store/models/Message.modules";
interface ChatBoxMessageProps {
  message: Message;
  receiver: User;
}
const ChatBoxMessage: React.FC<ChatBoxMessageProps> = ({
  message,
  receiver,
}) => {
  const currentUser = useSelector<RootState, User | null>(
    (state) => state.auth.currentUser
  );
  return (
    <div className={classes["chatbox"] + " rounded"}>
      {message.senderId === currentUser?.id && (
        <div className="col-1">
          <Image
            src={process.env.REACT_APP_SERVER_URL! + currentUser?.image}
            roundedCircle
            className={classes["image-icon"] + " shadow-sm"}
          />
        </div>
      )}
      <div
        className={`col-11 shadow-sm p-2 ${classes["chatbox-message"]} ${
          message.senderId === currentUser?.id
            ? classes["send-message"]
            : classes["receive-message"]
        }`}
      >
        <p className={classes["message-row"] + " pb-2"}>{message.message}</p>

        <p className={classes["time-row"]}>
          {new Date(message.time).toLocaleTimeString("en-CA")}
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
      {message.senderId === receiver?.id && (
        <div className="col-1 d-flex justify-content-center">
          <Image
            src={process.env.REACT_APP_SERVER_URL! + receiver.image}
            roundedCircle
            className={classes["image-icon"] + " shadow-sm"}
          />
        </div>
      )}
    </div>
  );
};

export default ChatBoxMessage;
