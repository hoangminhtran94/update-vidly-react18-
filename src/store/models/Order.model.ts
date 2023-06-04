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
}

export interface OrderItem {
  id: string;
  quantity: number;
  movieId: String;
  movie: Movie;
}
