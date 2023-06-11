import { FC, useEffect, useRef, useState } from "react";
import ChatBoxMessage from "../ChatBoxMessage/ChatBoxMessage";
import { messageApiSlice, useGetMessagesQuery } from "../../store/messageApi";
import { Button, Form } from "react-bootstrap";
import { Socket } from "socket.io-client";
import { User } from "../../store/models/User.models";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";

interface ChatBoxMessageAreaProps {
  receiver: User;
  socket: Socket;
}

const ChatBoxMessageArea: FC<ChatBoxMessageAreaProps> = ({
  receiver,
  socket,
}) => {
  const { data: messageRoomData, isSuccess } = useGetMessagesQuery(receiver.id);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isSuccess) {
      dispatch(messageApiSlice.util.invalidateTags(["chatlist"]));
      socket.emit("join-room", messageRoomData.roomId);
      socket.emit("read-message", messageRoomData.roomId);
    }
    if (messageRoomData?.children?.length! > 0) {
      messageBoxRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [
    dispatch,
    isSuccess,
    messageRoomData?.children?.length,
    messageRoomData?.roomId,
    socket,
  ]);
  const messageBoxRef = useRef<HTMLDivElement>(null);
  const [chatInput, setChatInput] = useState<string>("");

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex flex-col overflow-y-scroll gap-2 px-2 py-4 flex-1">
        <p>{`Messaging with: ${receiver.firstName} ${receiver.lastName}`}</p>
        {messageRoomData?.children.map((message, index) => (
          <ChatBoxMessage key={index} receiver={receiver} message={message} />
        ))}
        <div style={{ height: 0 }} ref={messageBoxRef}></div>
        {/* <ChatBoxMessage type="receive" /> */}
      </div>
      <div className="border-t border-t-slate-100 flex p-2">
        <Form.Control
          name="Input"
          as="input"
          value={chatInput}
          placeholder="Chat message"
          onChange={(e) => {
            setChatInput(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              socket.emit(
                "send-message",
                chatInput,
                receiver.id,
                messageRoomData?.roomId
              );
              setChatInput("");
            }
          }}
        />
        <Button
          className="d-flex align-items-center"
          disabled={!chatInput}
          onClick={() => {
            socket.emit(
              "send-message",
              chatInput,
              receiver.id,
              messageRoomData?.roomId
            );
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
