import http from "./httpService";
import config from "../config.json";

export function getGenres() {
  return http.get(
    "https://vidly-1dfd0-default-rtdb.firebaseio.com/genres.json"
  );
}
