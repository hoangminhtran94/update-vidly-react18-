export interface User {
  id: string;
  image: string;
  username: string;
  password?: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
}

export interface CustomerOrder {
  id: string;
  createdAt: string;
  updatedAt: string;
  movieId: string;
  customerId: string;
  quantity: number;
}
