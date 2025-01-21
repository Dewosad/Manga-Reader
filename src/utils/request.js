import axios from "axios";

export const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL;

const https = axios.create({
  baseURL: BASE_URL,
  responseType: "json",
});

function getHeaders(isMultipart = false) {
  return {
    "Content-type": isMultipart ? "mulitpart/form-data" : "application/json",
  };
}

function get(url, params = {}) {
  return https
    .get(url, {
      headers: getHeaders(),
      params,
    })
    .then((res) => res.data)
    .catch((err) => handleRequestError(err));
}

function post(url, data, isMultipart = false) {
  return https
    .post(url, data, {
      headers: getHeaders(isMultipart),
    })
    .then((res) => res.data)
    .catch((err) => handleRequestError(err));
}

function handleRequestError(err) {
  console.error(err, "Request Error");
}

export default {
  get,
  post,
};
