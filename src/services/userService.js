import http from "./httpService";
import config from "../config.json";
import httpService from "./httpService";

export function register(url, user) {
  return httpService.post(url, user);
}
