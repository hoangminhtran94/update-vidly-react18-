export interface Customer {
  userId: string;
  orders: { productId: string; quantity: number }[];
  orderDate: Date;
  
}
