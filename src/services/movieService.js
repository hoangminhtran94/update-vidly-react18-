import http from "./httpService";
import config from "../config.json";
import { random } from "lodash";

const apiEndPoint = "/movies.json";

function movieUrl(id) {
  return `https://vidly-1dfd0-default-rtdb.firebaseio.com/movies/${id}`;
}
export function getMovies() {
  return http.get(
    "https://vidly-1dfd0-default-rtdb.firebaseio.com/" + apiEndPoint
  );
}
export function getMovie(movieID) {
  return http.get(movieUrl(movieID));
}

export function saveMovie(movie, genres) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    console.log(body);
    return http.put(movieUrl(movie)._id, body);
  }
  console.log(movie);
  const selectedGenre = genres.find((genre) => {
    return genre._id === movie.genreId;
  });

  return http.post(
    "https://vidly-1dfd0-default-rtdb.firebaseio.com/" + apiEndPoint,
    { ...movie, _id: random(1, 10000000).toString(), genre: selectedGenre }
  );
}
export function deleteMovie(movieID) {
  return http.delete(movieUrl(movieID));
}
