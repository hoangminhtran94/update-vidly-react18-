import { FC, useRef, useState } from "react";
import classes from "./ChatBoxMessage.moduel.css";
import { ChatList, Message } from "../../store/models/Message.modules";
import ChatBoxMessage from "../ChatBoxMessage/ChatBoxMessage";
import { useGetMessagesQuery } from "../../store/messageApi";
import { Button, Form } from "react-bootstrap";
import { Socket } from "socket.io-client";
import { User } from "../../store/models/User.models";

interface ChatBoxMessageAreaProps {
  chatlist: ChatList;
  socket: Socket;
}

const ChatBoxMessageArea: FC<ChatBoxMessageAreaProps> = ({
  chatlist,
  socket,
}) => {
  const { data: messageRoomData } = useGetMessagesQuery(chatlist.roomId);
  const messageBoxRef = useRef<HTMLDivElement>(null);
  const [chatInput, setChatInput] = useState<string>("");
  return (
    <div className={classes["chax-box"]}>
      <div className={classes["content-row"]}>
        {/* Render Image*/}
        {messageRoomData?.messages.map((message, index) => (
          <ChatBoxMessage
            key={index}
            receiver={chatlist.user}
            message={message}
          />
        ))}
        <div style={{ height: 0 }} ref={messageBoxRef}></div>
        {/* <ChatBoxMessage type="receive" /> */}
      </div>
      <div className={classes["action-row"]}>
        <Form.Control
          name="Input"
          as="input"
          value={chatInput}
          placeholder="Chat message"
          onChange={(e) => {
            setChatInput(e.target.value);
          }}
        />
        <Button
          className="d-flex align-items-center"
          disabled={!chatInput}
          onClick={() => {
            socket.emit("send-message", chatInput);
            setChatInput("");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-arrow-right-circle"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default ChatBoxMessageArea;
