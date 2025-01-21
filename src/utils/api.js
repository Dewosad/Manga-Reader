import API from "./request";

export const fetchChapter = () => API.get("/chapter");
export const fetchMangaById = (id) => API.get(`/manga/${id}`);
export const fetchMangaDetails = (id) => API.get(`/manga/${id}/feed`);

export const fetchManga = (title) =>
  API.get(`/manga?title=${encodeURIComponent(title)}`);
