import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Movie } from "../../store/models/Movie.model";
import { CustomerOrder, User } from "../../store/models/User.models";

const usePopulateOrderData = () => {
  const customers = useSelector<RootState, User[]>(
    (state) => state.customer.customers
  );
  const movies = useSelector<RootState, Movie[]>((state) => state.movie.movies);
  const customerOrders = useSelector<RootState, CustomerOrder[]>(
    (state) => state.customer.customerOrders
  );
  const orderWithCustomerData = useMemo(
    () =>
      customerOrders.map((order) => {
        const currentUser = customers.find(
          (user) => user.id === order.customerId
        );
        return {
          ...order,
          name: currentUser?.name,
          userName: currentUser?.userName,
          customerImage: currentUser?.image,
        };
      }),
    [customerOrders, customers]
  );

  const orderWithMovieData = useMemo(
    () =>
      orderWithCustomerData.map((order) => {
        const currentMovie = movies.find((movie) => movie.id === order.movieId);
        const { id, ...currentMovieWithoutid } = currentMovie!;
        return { ...order, ...currentMovieWithoutid };
      }),
    [movies, orderWithCustomerData]
  );

  return orderWithMovieData;
};
type ArrayElementType<ArrayType extends Array<any>> = ArrayType[number];
export type OrderData = ArrayElementType<
  ReturnType<typeof usePopulateOrderData>
>;
export default usePopulateOrderData;
