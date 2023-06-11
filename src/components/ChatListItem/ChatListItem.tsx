import { FC, MouseEventHandler } from "react";
import { ChatList } from "../../store/models/Message.modules";
import { Image } from "react-bootstrap";
const ChatListItem: FC<{ chatList: ChatList; onClick: MouseEventHandler }> = ({
  chatList,
  onClick,
}) => {
  return (
    <div
      className=" flex  rounded-full   shadow-md border border-indigo-700 items-center cursor-pointer"
      onClick={onClick}
    >
      <Image
        src={process.env.REACT_APP_SERVER_URL + chatList.user.image}
        className=" rounded-full me-2 w-[24px] h-[24px] object-cover"
      />
      <p className="m-0 text-sm">{chatList.user.firstName}</p>
    </div>
  );
};

export default ChatListItem;
