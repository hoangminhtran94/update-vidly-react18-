export interface User {
  id: string;
  image: string;
  userName: string;
  password?: string;
  name: string;
}

export interface CustomerOrder {
  id: string;
  createdAt: string;
  updatedAt: string;
  movieId: string;
  customerId: string;
  quantity: number;
}
