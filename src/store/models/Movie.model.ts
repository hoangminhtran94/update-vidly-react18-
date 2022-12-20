export interface Movie {
  id: string;
  title: string;
  genre?: Genre;
  genreId?: string;
  numberInStock: number;
  dailyRentalRate: number;
  publishDate?: Date;
  liked?: boolean;
  isClick?: boolean;
  description: string;
  image: string;
}

export interface Genre {
  id: string;
  name: string;
}
