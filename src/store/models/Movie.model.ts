import { User } from "./User.models";

export interface Movie {
  id: string;
  title: string;
  genre?: Genre;
  genreId?: string;
  numberInStock: number;
  dailyRentalRate: number;
  publishDate?: string;
  liked?: boolean;
  isClick?: boolean;
  description: string;
  image: string;
  ownerId: string;
  owner?: User;
}

export interface Genre {
  id: string;
  name: string;
}
