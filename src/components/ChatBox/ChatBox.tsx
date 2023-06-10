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
import { ChatList, Message } from "../../store/models/Message.modules";
import { Order } from "../../store/models/Order.model";
import { useGetChatListQuery } from "../../store/messageApi";
import ChatBoxMessageArea from "../ChatBoxMessageArea/ChatBoxMessageArea";
const ChatBox = () => {
  const [currentChatList, setCurrentChatList] = useState<ChatList | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const { data: chatlist, error } = useGetChatListQuery();
  const toggle = useSelector<RootState, boolean>(
    (state) => state.chatbox.toggle
  );
  const messageBoxRef = useRef<HTMLDivElement>(null);
  const currentUser = useSelector<RootState, User | null>(
    (state) => state.auth.currentUser
  );
  const token = useSelector<RootState, string | null>(
    (state) => state.auth.token
  );
  const socket = useMemo(
    () => io(process.env.REACT_APP_SERVER_URL!, { auth: { token: token } }),
    [token]
  );

  const dispatch = useDispatch();
  const { data } = useGetCustomerOrdersQuery<{
    data: Order[];
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
          {!currentChatList ? (
            <div className={classes["chatbox-placeholder"]}>
              Click on customer to chat
            </div>
          ) : (
            <ChatBoxMessageArea socket={socket} chatlist={currentChatList} />
          )}

          <div className={classes["chat-list"]}>
            {!chatlist ? (
              <p>Loading</p>
            ) : (
              chatlist.map((list, index) => (
                <div
                  key={index}
                  className={
                    classes["chat-list-item"] +
                    " d-flex rounded shadow-sm p-2 my-2 mx-1"
                  }
                  onClick={async () => {
                    try {
                      setCurrentChatList(list);
                      socket.emit("join-room", list.roomId);
                    } catch {}
                  }}
                >
                  <Image
                    src={process.env.REACT_APP_SERVER_URL + list.user.image}
                    className={classes["chat-list-icon"] + " rounded me-2"}
                  />
                  <p className="m-0">{list.user.firstName}</p>
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
