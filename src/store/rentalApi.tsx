import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Movie, Genre } from "./models/Movie.model";
import { RootState } from ".";
export const rentalApiSlice = createApi({
  reducerPath: "rentalApi",
  tagTypes: ["publicMovieData"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_API,
    prepareHeaders: (headers, { getState }) => {
      let token = (getState() as RootState).auth.token;
      if (!token) {
        token = localStorage.getItem("token");
      }
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMovies: builder.query<Movie[], void>({
      query: () => ({ url: "movies" }),
      providesTags: ["publicMovieData"],
    }),
  }),
});

export const { useGetMoviesQuery } = rentalApiSlice;
