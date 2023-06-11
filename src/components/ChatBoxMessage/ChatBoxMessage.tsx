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
  const mode = message.senderId === currentUser?.id ? "send" : "receive";
  return (
    <div className={classes["chatbox"] + " rounded"}>
      {mode === "send" && (
        <div className="col-1">
          <Image
            src={process.env.REACT_APP_SERVER_URL! + currentUser?.image}
            roundedCircle
            className={classes["image-icon"] + " shadow-sm object-cover"}
          />
        </div>
      )}
      <div
        className={`col-11 shadow-sm p-2  ${classes["chatbox-message"]} ${
          mode === "send"
            ? `${classes["send-message"]} bg-indigo-500 text-white `
            : `${classes["receive-message"]} bg-slate-100`
        }`}
      >
        <p className={classes["message-row"] + " pb-2"}>{message.message}</p>

        <p className="text-xs  flex justify-between">
          {new Date(message.time).toLocaleTimeString("en-CA")}
          <span className={`${mode === "receive" && "hidden"}`}>
            {message.read ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.5 12.5L5.57574 16.5757C5.81005 16.8101 6.18995 16.8101 6.42426 16.5757L9 14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M16 7L12 11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M7 12L11.5757 16.5757C11.8101 16.8101 12.1899 16.8101 12.4243 16.5757L22 7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
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
            )}
          </span>
        </p>
      </div>
      {mode === "receive" && (
        <div className="col-1 d-flex justify-content-center">
          <Image
            src={process.env.REACT_APP_SERVER_URL! + receiver.image}
            roundedCircle
            className={classes["image-icon"] + " shadow-sm object-cover"}
          />
        </div>
      )}
    </div>
  );
};

export default ChatBoxMessage;
