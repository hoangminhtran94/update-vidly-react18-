import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logService";

// axios.interceptors.response.use(null, (error) => {
//   const expectedError =
//     error.reponse &&
//     (error.reponse.status >= 400) & (error.reponse.status < 500);
//   if (!expectedError) {
//     logger.log(error);
//     toast.error("Something wrong");
//   }
//   return Promise.reject(error);
// });
function post(url, body) {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
  });
}
function get(url) {
  return fetch(url, { method: "GET" });
}

function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}
export default {
  post,
  get,
  delete: axios.delete,
  setJwt,
};
