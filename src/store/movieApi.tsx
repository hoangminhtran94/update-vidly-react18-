import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Movie, Genre } from "./models/Movie.model";
import { RootState } from ".";
export const movieApiSlice = createApi({
  reducerPath: "movieApi",
  tagTypes: ["movieData"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_API,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMovies: builder.query<Movie[], void>({
      query: () => ({ url: "movies" }),
      providesTags: ["movieData"],
    }),
    getGenres: builder.query<Genre[], void>({
      query: () => ({ url: "movies/genre" }),
      providesTags: ["movieData"],
    }),
    deleteMovie: builder.mutation<any, string>({
      query: (id) => ({
        url: `movies/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["movieData"],
    }),
    addAMovie: builder.mutation<any, FormData>({
      query: (movieForm) => ({
        url: "movies",
        method: "POST",
        body: movieForm,
      }),
      invalidatesTags: ["movieData"],
    }),
    updateAMovie: builder.mutation<any, FormData>({
      query: (data) => ({
        url: "movies/edit",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["movieData"],
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetGenresQuery,
  useDeleteMovieMutation,
  useAddAMovieMutation,
  useUpdateAMovieMutation,
} = movieApiSlice;
