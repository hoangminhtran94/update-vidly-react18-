import Button from "react-bootstrap/Button";
import { CSSTransition } from "react-transition-group";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { chatboxActions } from "./../../store/chatbox";
import { io } from "socket.io-client";
import { useEffect, useState, useMemo, useRef } from "react";
import { ChatList, Message } from "../../store/models/Message.modules";
import { messageApiSlice, useGetChatListQuery } from "../../store/messageApi";
import ChatBoxMessageArea from "../ChatBoxMessageArea/ChatBoxMessageArea";
import ChatListItem from "../ChatListItem/ChatListItem";
import { User } from "../../store/models/User.models";
import { uniqueId } from "lodash";
const ChatBox = () => {
  const { data: chatlist, error } = useGetChatListQuery();
  const toggle = useSelector<RootState, boolean>(
    (state) => state.chatbox.toggle
  );
  const currentReceiver = useSelector<RootState, User | null>(
    (state) => state.chatbox.currentReceiver
  );

  const token = useSelector<RootState, string | null>(
    (state) => state.auth.token
  );
  const socket = useMemo(
    () =>
      io(process.env.REACT_APP_SERVER_URL!, {
        auth: { token: token },
      }),
    [token]
  );

  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("receive-message", (message: Message) => {
      dispatch(messageApiSlice.util.invalidateTags(["messagesData"]));
    });
    return () => {
      socket.off("connect");
      socket.off("receive-message");
    };
  }, [dispatch, socket]);

  // useEffect(() => {
  //   messageBoxRef.current?.scrollIntoView({
  //     behavior: "smooth",
  //   });
  // }, []);
  return (
    <CSSTransition
      in={toggle}
      classNames="chatbox"
      timeout={300}
      unmountOnExit
      mountOnEnter
    >
      <div className=" fixed right-[3%] bottom-[3%] flex flex-col w-[500px] h-[500px] overflow-hidden bg-white shadow rounded z-[99999999]">
        <div className="h-[10%] box-border bg-secondary p-2 text-white d-flex justify-content-between">
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
        <div className="flex h-[90%]">
          {!currentReceiver ? (
            <div className="flex-1 flex justify-center items-center">
              Click on customer to chat
            </div>
          ) : (
            <ChatBoxMessageArea socket={socket} receiver={currentReceiver} />
          )}

          <div className="w-[30%] border-l border-l-slate-100 p-3 overflow-scroll flex  flex-col gap-3 ">
            {!chatlist ? (
              <p>Loading</p>
            ) : chatlist.length === 0 ? (
              <p>There is no previous chat</p>
            ) : (
              chatlist.map((list, index) => (
                <ChatListItem
                  onClick={async () => {
                    try {
                      dispatch(chatboxActions.setCurrentReceiver(list.user));
                      socket.emit("join-room", list.roomId);
                    } catch {}
                  }}
                  chatList={list}
                  key={uniqueId()}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default ChatBox;
