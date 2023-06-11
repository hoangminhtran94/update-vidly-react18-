import { User } from "./User.models";

export interface Message {
  senderId: string;
  receiverId: string;
  message: string;
  time: Date;
  read: boolean;
}

export interface MessageRoom {
  roomId: string;
  children: Message[];
}

export interface ChatList {
  user: User;
  roomId: string;
  unreadCounter: number;
}
