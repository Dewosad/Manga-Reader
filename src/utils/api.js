import API from "./request";

export const fetchChapter = () => API.get("/chapter");
export const fetchMangaById = (id) => API.get(`/manga/${id}`);
export const fetchMangaDetails = (id) =>
  API.get(`/manga/${id}/feed`, {
    limit: 20,
    offset: 1,
    includes: ["scanlation_group"],
    translatedLanguage: ["en"],
    order: {
      chapter: "desc",
    },
    contentRating: ["safe", "suggestive", "erotica"],
  });

// export const fetchManga = (title) =>
//   API.get(`/manga?title=${encodeURIComponent(title)}`);
// export const fetchCover = (mangaId) => API.get(`/cover/${mangaId}`);
// export const fetchCoverInfo = () => API.get("/cover");

export const fetchManga = (title) =>
  API.get("/manga", {
    includes: ["cover_art"],
    limit: 20,
    title: title,
  });

export const getCoverImage = (manga) => {
  const coverArt = manga.relationships?.find((rel) => rel.type === "cover_art");

  if (!coverArt) {
    return "/placeholder.svg";
  }

  return `https://uploads.mangadex.org/covers/${manga.id}/${coverArt.attributes?.fileName}`;
};
