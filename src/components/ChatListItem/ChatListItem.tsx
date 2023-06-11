import { FC, MouseEventHandler, useEffect } from "react";
import { ChatList } from "../../store/models/Message.modules";
import { Image } from "react-bootstrap";
import { Socket } from "socket.io-client";
const ChatListItem: FC<{
  chatList: ChatList;
  onClick: MouseEventHandler;
  socket: Socket;
}> = ({ chatList, onClick, socket }) => {
  useEffect(() => {
    socket.emit("join-room", chatList.roomId);
  }, [chatList.roomId, socket]);

  return (
    <div
      className=" flex relative rounded-full hover:scale-105   shadow-md border border-indigo-700 items-center cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      <Image
        src={process.env.REACT_APP_SERVER_URL + chatList.user.image}
        className=" rounded-full me-2 w-[30px] h-[30px] object-cover"
      />
      <p className="m-0 text-xs">{chatList.user.firstName}</p>
      {chatList.unreadCounter > 0 && (
        <span className="absolute w-5 h-5 rounded-full -top-2 -right-2 bg-red-500 shadow-md text-white text-center">
          {chatList.unreadCounter}
        </span>
      )}
    </div>
  );
};

export default ChatListItem;
