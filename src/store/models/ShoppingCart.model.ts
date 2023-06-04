import { User } from "./User.models";
import { CartItem } from "./CartItem.modules";
import { Order } from "./Order.model";

export interface ShoppingCart {
  id: string;
  owner: User;
  ownerId: string;
  cartItems: CartItem[];
  order: Order[];
}
