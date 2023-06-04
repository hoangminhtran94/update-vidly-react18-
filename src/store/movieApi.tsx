import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Movie, Genre } from "./models/Movie.model";
import { RootState } from ".";
export const movieApiSlice = createApi({
  reducerPath: "movieApi",
  tagTypes: ["movieData", "publicMovieData"],
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
    getYourMovies: builder.query<Movie[], void>({
      query: () => ({ url: "movies/your-movies" }),
      providesTags: ["movieData"],
    }),
    getGenres: builder.query<Genre[], void>({
      query: () => ({ url: "movies/genre" }),
      providesTags: ["movieData"],
    }),
    addAGenre: builder.mutation<any, Genre>({
      query: (genre) => ({
        url: "movies/genre",
        method: "POST",
        body: JSON.stringify(genre),
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["movieData"],
    }),
    editAGenre: builder.mutation<any, Genre>({
      query: (genre) => ({
        url: "movies/genre/" + genre.id,
        method: "POST",
        body: JSON.stringify({ name: genre.name }),
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["movieData"],
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
  useAddAGenreMutation,
  useEditAGenreMutation,
  useGetYourMoviesQuery,
} = movieApiSlice;
