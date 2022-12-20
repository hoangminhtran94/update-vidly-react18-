import { createSlice, ThunkAction, AnyAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { Genre, Movie } from "./models/Movie.model";

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
  movies: [
    {
      id: "5b21ca3eeb7f6fbccd471815",
      title: "Terminator",
      genreId: "5b21ca3eeb7f6fbccd471818",
      numberInStock: 6,
      dailyRentalRate: 2.5,
      publishDate: new Date("2018-01-03T19:04:28.809Z"),
      description:
        "A human soldier is sent from 2029 to 1984 to stop an almost indestructible cyborg killing machine, sent from the same year, which has been programmed to execute a young woman whose unborn son is the key to humanity's future salvation.",
      liked: true,
      image:
        "https://m.media-amazon.com/images/M/MV5BYTViNzMxZjEtZGEwNy00MDNiLWIzNGQtZDY2MjQ1OWViZjFmXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    },
    {
      id: "5b21ca3eeb7f6fbccd471816",
      title: "Die Hard",
      genreId: "5b21ca3eeb7f6fbccd471818",
      numberInStock: 5,
      dailyRentalRate: 2.5,
      description:
        "A New York City police officer tries to save his estranged wife and several others taken hostage by terrorists during a Christmas party at the Nakatomi Plaza in Los Angeles.",
      image:
        "https://m.media-amazon.com/images/M/MV5BZjRlNDUxZjAtOGQ4OC00OTNlLTgxNmQtYTBmMDgwZmNmNjkxXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
      publishDate: new Date("2018-01-03T19:04:28.809Z"),
      liked: false,
    },
    {
      id: "5b21ca3eeb7f6fbccd471817",
      title: "Get Out",
      genreId: "5b21ca3eeb7f6fbccd471820",
      numberInStock: 8,
      image:
        "https://m.media-amazon.com/images/M/MV5BMjUxMDQwNjcyNl5BMl5BanBnXkFtZTgwNzcwMzc0MTI@._V1_.jpg",
      description:
        "A young African-American visits his white girlfriend's parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point.",
      dailyRentalRate: 3.5,
      publishDate: new Date("2018-01-03T19:04:28.809Z"),
      liked: false,
    },
    // {
    //   id: "5b21ca3eeb7f6fbccd471819",
    //   title: "Trip to Italy",
    //   genreId: "5b21ca3eeb7f6fbccd471814",
    //   numberInStock: 7,
    //   dailyRentalRate: 3.5,
    //   publishDate: new Date("2018-01-03T19:04:28.809Z"),
    //   liked: true,
    // },
    // {
    //   id: "5b21ca3eeb7f6fbccd47181a",
    //   title: "Airplane",
    //   genreId: "5b21ca3eeb7f6fbccd471814",
    //   numberInStock: 7,
    //   dailyRentalRate: 3.5,
    //   publishDate: new Date("2018-01-03T19:04:28.809Z"),
    //   liked: true,
    // },
    // {
    //   id: "5b21ca3eeb7f6fbccd47181b",
    //   title: "Wedding Crashers",
    //   genreId: "5b21ca3eeb7f6fbccd471814",
    //   numberInStock: 7,
    //   dailyRentalRate: 3.5,
    //   publishDate: new Date("2018-01-03T19:04:28.809Z"),
    //   liked: true,
    // },
    // {
    //   id: "5b21ca3eeb7f6fbccd47181e",
    //   title: "Gone Girl",
    //   genreId: "5b21ca3eeb7f6fbccd471820",
    //   numberInStock: 7,
    //   dailyRentalRate: 4.5,
    //   publishDate: new Date("2018-01-03T19:04:28.809Z"),
    //   liked: true,
    // },
    // {
    //   id: "5b21ca3eeb7f6fbccd47181f",
    //   title: "The Sixth Sense",
    //   genreId: "5b21ca3eeb7f6fbccd471820",
    //   numberInStock: 4,
    //   dailyRentalRate: 3.5,
    //   publishDate: new Date("2018-01-03T19:04:28.809Z"),
    //   liked: true,
    // },
    // {
    //   id: "5b21ca3eeb7f6fbccd471821",
    //   title: "The Avengers",
    //   genreId: "5b21ca3eeb7f6fbccd471818",
    //   numberInStock: 7,
    //   dailyRentalRate: 3.5,
    //   publishDate: new Date("2018-01-03T19:04:28.809Z"),
    //   liked: true,
    // },
  ],
  currentMovie: null,
  pageSize: 4,
  currentPage: 1,
  genre: [
    { id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
    { id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
    { id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
  ],
  currentGenre: "5b21ca3eeb7f6fbccd471818",
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
