import React, { useState } from "react";
import {
  fetchManga,
  fetchChapter,
  fetchMangaById,
  fetchMangaDetails,
} from "../utils/api";
import Card from "../components/Card";

const Home = () => {
  const [query, setQuery] = useState("");
  const [mangas, setMangas] = useState([]);

  const handleSearch = () => {
    fetchManga(query)
      .then((response) => {
        setMangas(response.data);
        console.log(response.data, "data");
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div className="bg-gray-900 h-screen text-white flex flex-col gap-10 items-center justify-center">
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 text-lg text-gray-900 rounded-lg"
        />
        <button className="bg-blue-500" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="border border-red-500">
        {mangas && mangas.length > 0 ? (
          mangas.map((manga) => (
            <Card
              key={manga.id}
              title={
                manga.attributes.title.en ||
                manga.attributes.title.ja ||
                "No title"
              }
              type={manga.type}
              status={manga.attributes.status}
            />
          ))
        ) : (
          <p>No manga found</p>
        )}
      </div>
    </div>
  );
};

export default Home;
