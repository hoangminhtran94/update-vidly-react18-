import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Genre } from "./models/Movie.model";
import { RootState } from ".";
export const genreApiSlice = createApi({
  reducerPath: "genreApi",
  tagTypes: ["genreData"],
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
    getGenres: builder.query<Genre[], void>({
      query: () => ({ url: "genre" }),
      providesTags: ["genreData"],
    }),
    addAGenre: builder.mutation<any, string>({
      query: (genre) => ({
        url: "genre",
        method: "POST",
        body: JSON.stringify({ name: genre }),
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["genreData"],
    }),
    editAGenre: builder.mutation<any, Genre>({
      query: (genre) => ({
        url: "genre/" + genre.id,
        method: "POST",
        body: JSON.stringify({ name: genre.name }),
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["genreData"],
    }),
  }),
});

export const {
  useGetGenresQuery,
  useAddAGenreMutation,
  useEditAGenreMutation,
} = genreApiSlice;
