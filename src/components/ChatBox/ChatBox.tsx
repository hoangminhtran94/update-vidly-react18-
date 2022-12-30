import { Form } from "react-bootstrap";
import classes from "./ChatBox.module.css";
import Button from "react-bootstrap/Button";
import { CSSTransition } from "react-transition-group";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { chatboxActions } from "./../../store/chatbox";
import ChatBoxMessage from "../ChatBoxMessage/ChatBoxMessage";
import { io } from "socket.io-client";
import { useEffect, useState, useMemo, useRef } from "react";
import { useGetCustomerOrdersQuery } from "../../store/orderApi";
import { CustomerOrder, User } from "../../store/models/User.models";
import { Image } from "react-bootstrap";
import { useGetMessagesMutation } from "../../store/messageApi";
import { Message } from "../../store/models/Message.modules";
const ChatBox = () => {
  const [chatInput, setChatInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [receiver, setReceiver] = useState<User | null>(null);
  const [getMessages] = useGetMessagesMutation();
  const toggle = useSelector<RootState, boolean>(
    (state) => state.chatbox.toggle
  );
  const messageBoxRef = useRef<HTMLDivElement>(null);
  const currentUser = useSelector<RootState, User | null>(
    (state) => state.auth.currentUser
  );
  const socket = useMemo(() => io("http://localhost:5000"), []);

  const dispatch = useDispatch();
  const { data } = useGetCustomerOrdersQuery<{
    data: { customerOrders: CustomerOrder[]; customers: User[] };
  }>();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("receive-message", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });
    return () => {
      socket.off("connect");
      socket.off("receive-message");
    };
  }, [socket]);
  useEffect(() => {
    messageBoxRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages.length]);

  return (
    <CSSTransition
      in={toggle}
      classNames="chatbox"
      timeout={300}
      unmountOnExit
      mountOnEnter
    >
      <div className={classes["chat-box-container"] + " shadow rounded"}>
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
        <div className={classes["chat-area-container"]}>
          <div className={classes["chax-box"]}>
            {!receiver || !currentUser || !data ? (
              <div className={classes["chatbox-placeholder"]}>
                Click on customer to chat
              </div>
            ) : (
              <>
                <div className={classes["content-row"]}>
                  {/* Render Image*/}
                  {messages.map((message, index) => (
                    <ChatBoxMessage
                      key={index}
                      users={data.customers}
                      type={
                        currentUser.id === message.senderId ? "send" : "receive"
                      }
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
                      setMessages((prev) => [
                        ...prev,
                        {
                          senderId: currentUser?.id,
                          receiverId: receiver.id,
                          message: chatInput,
                          time: new Date(Date.now()),
                        },
                      ]);

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
              </>
            )}
          </div>
          <div className={classes["chat-list"]}>
            {!data ? (
              <p>Loading</p>
            ) : (
              [...data.customers]
                .filter(
                  (user, index, array) =>
                    array.findIndex((item) => item.id === user.id) === index
                )
                .map((user, index) => (
                  <div
                    key={index}
                    className={
                      classes["chat-list-item"] +
                      " d-flex rounded shadow-sm p-2 my-2 mx-1"
                    }
                    onClick={async () => {
                      try {
                        let roomName = [currentUser!.id, user.id]
                          .sort((a, b) => (a < b ? 1 : -1))
                          .join("-");
                        const messages = await getMessages(roomName).unwrap();
                        setMessages(messages);
                        socket.emit("join-room", currentUser?.id, user.id);
                        setReceiver(user);
                      } catch {}
                    }}
                  >
                    <Image
                      src={"http://localhost:5000/" + user.image}
                      className={classes["chat-list-icon"] + " rounded me-2"}
                    />
                    <p className="m-0">{user.name}</p>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default ChatBox;
