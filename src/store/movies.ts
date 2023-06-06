import { createSlice, ThunkAction, AnyAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { Genre, Movie } from "./models/Movie.model";
import { toast } from "react-toastify";

export interface MovieState {
  currentMovie: number | null;
  pageSize: number;
  currentPage: number;
  currentGenre: string;
  searchQuery: string;
  currentEditMovie: Movie | null;
  sortColumn: { path: string; order: "asc" | "desc" };
}
const initialState: MovieState = {
  currentMovie: null,
  pageSize: 4,
  currentPage: 1,
  currentEditMovie: null,
  currentGenre: "all",
  searchQuery: "",
  sortColumn: { path: "title", order: "asc" },
};
const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setGenre(state, action) {
      state.currentGenre = action.payload;
      state.searchQuery = "";
      state.currentPage = 1;
    },

    setSort(state, action) {
      state.sortColumn = action.payload;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setCurrentMovie(state, action) {
      state.currentEditMovie = action.payload;
    },
  },
});

export const movieActions = movieSlice.actions;
export default movieSlice.reducer;
