import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Movie, Genre } from "./models/Movie.model";
import { RootState } from ".";
export const movieApiSlice = createApi({
  reducerPath: "movieApi",
  tagTypes: ["movieData"],
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
    getYourMovies: builder.query<Movie[], void>({
      query: () => ({ url: "movies/your-movies" }),
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
    updateAMovie: builder.mutation<any, { data: FormData; movieId: string }>({
      query: ({ data, movieId }) => ({
        url: "movies/" + movieId,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["movieData"],
    }),
  }),
});

export const {
  useDeleteMovieMutation,
  useAddAMovieMutation,
  useUpdateAMovieMutation,
  useGetYourMoviesQuery,
} = movieApiSlice;
