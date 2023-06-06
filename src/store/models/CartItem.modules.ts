import { Movie } from "./Movie.model";

export interface CartItem {
  id: string;
  movie: Movie;
  movieId: string;
  quantity?: number;
  createdAt?: string;
  shoppingCartId?: string;
  updatedAt?: string;
}
