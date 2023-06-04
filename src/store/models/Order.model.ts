import { Movie } from "./Movie.model";
import { ShoppingCart } from "./ShoppingCart.model";
import { User } from "./User.models";

export interface Order {
  id: string;
  userId: string;
  user: User;
  orderItems: OrderItem[];
  shoppingCartId: string;
  shoppingCart: ShoppingCart;
  orderStatus: OrderStatus;
}

export interface OrderItem {
  id: string;
  quantity: number;
  movieId: String;
  movie: Movie;
}

export interface OrderStatus {
  id: string;
  name: string;
}
