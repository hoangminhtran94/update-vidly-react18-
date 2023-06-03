import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Movie } from "../../store/models/Movie.model";
import { CustomerOrder, User } from "../../store/models/User.models";
import { useGetMoviesQuery } from "../../store/movieApi";
import { useGetCustomerOrdersQuery } from "../../store/orderApi";

const usePopulateOrderData = () => {
  const { data } = useGetCustomerOrdersQuery<{
    data: { customerOrders: CustomerOrder[]; customers: User[] };
  }>();
  const { data: movies, error } = useGetMoviesQuery();

  if (!data) {
    return [];
  }

  const { customerOrders, customers } = data;

  const orderWithCustomerData = customerOrders.map((order) => {
    const currentUser = customers.find((user) => user.id === order.customerId);
    return {
      ...order,
      name: currentUser?.name,
      username: currentUser?.username,
      customerImage: currentUser?.image,
    };
  });

  const orderWithMovieData = orderWithCustomerData.map((order) => {
    const currentMovie = movies!.find((movie) => movie.id === order.movieId);
    const { id, ...currentMovieWithoutid } = currentMovie!;
    return { ...order, ...currentMovieWithoutid };
  });

  return orderWithMovieData;
};
type ArrayElementType<ArrayType extends Array<any>> = ArrayType[number];
export type OrderData = ArrayElementType<
  ReturnType<typeof usePopulateOrderData>
>;
export default usePopulateOrderData;
