import { createSlice, ThunkAction, AnyAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { Genre, Movie } from "./models/Movie.model";
import { getMovies } from "./../services/movieService";
import { toast } from "react-toastify";

export interface MovieState {
  movies: Movie[];
  currentMovie: number | null;
  pageSize: number;
  currentPage: number;
  genre: Genre[];
  currentGenre: string;
  searchQuery: string;
  sortColumn: { path: string; order: "asc" | "desc" };
}
const initialState: MovieState = {
  movies: [],
  currentMovie: null,
  pageSize: 4,
  currentPage: 1,
  genre: [],
  currentGenre: "all",
  searchQuery: "",
  sortColumn: { path: "title", order: "asc" },
};
const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovies(state, action) {
      state.movies = action.payload;
    },
    setGenres(state, action) {
      state.genre = action.payload;
    },
    setGenre(state, action) {
      state.currentGenre = action.payload;
      state.searchQuery = "";
      state.currentPage = 1;
    },
    addAMovie(state, action: { type: string; payload: Movie }) {
      state.movies.push(action.payload);
    },
    addAGenre(state, action) {
      console.log(action.payload);
      state.genre.push(action.payload);
    },
    editAMovie(state, action: { type: string; payload: Movie }) {
      const index = state.movies.findIndex(
        (movie) => movie.id === action.payload.id
      );
      state.movies[index] = action.payload;
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
    deleteAMovie(state, action) {
      const index = state.movies.findIndex(
        (movie) => movie.id === action.payload
      );
      state.movies.splice(index, 1);
    },
    setClick(state, action) {
      const index = state.movies.findIndex(
        (movie) => movie.id === action.payload.id
      );
      const currentMovie = {
        ...state.movies[index],
        isClick: state.movies[index].isClick || false,
      };
      currentMovie.isClick = !currentMovie.isClick;
      state.movies[index] = currentMovie;
      state.currentMovie = index;
    },
  },
});

export const movieActions = movieSlice.actions;
export default movieSlice.reducer;

export const fetchMovies = (): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch("http://localhost:5000/api/movies");
      console.log(response);
      if (response.ok) {
        const movies = await response.json();
        dispatch(movieActions.setMovies(movies));
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error: any) {
      toast(error.message, { type: "error" });
    }
  };
};
export const fetchGenres = (): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch("http://localhost:5000/api/movies/genre", {
        method: "GET",
      });
      console.log(response);
      if (response.ok) {
        const genres = await response.json();
        dispatch(movieActions.setGenres(genres));
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error: any) {
      toast(error.message, { type: "error" });
    }
  };
};
export const deleteMovie = (
  movieId: string
): ThunkAction<Promise<void>, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    const movies = getState().movie.movies;
    dispatch(movieActions.deleteAMovie(movieId));
  };
};
// const handleDelete = async (movie) => {
//     const originalMovies = state.movies;
//     const movies = originalMovies.filter((m) => m._id !== movie._id);
//     setState({ movies: movies });

//     try {
//       await deleteMovie(movie._id);
//     } catch (ex) {
//       if (ex.response && ex.response.status === 404)
//         toast.error("This movie has already been deleted.");
//       setState({ movies: originalMovies });
//     }
//   };
