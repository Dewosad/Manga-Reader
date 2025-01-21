import React, { useState } from "react";
import { fetchManga, getCoverImage } from "../utils/api";
import Card from "../components/Card";

const Home = () => {
  const [query, setQuery] = useState("");
  const [mangas, setMangas] = useState([]);

  const handleSearch = async () => {
    try {
      const mangaResponse = await fetchManga(query);
      console.log("Manga Response:", mangaResponse);
      setMangas(mangaResponse.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className={`bg-gray-900 text-white ${
        mangas.length > 0 ? "h-full pb-10" : "h-screen"
      }`}
    >
      <div className="p-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 text-lg text-gray-900 rounded-lg"
        />
        <button
          className="bg-blue-500 px-4 py-2 rounded-lg mt-2"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div className="flex flex-wrap itemsf-center justiffy-center gap-5 px-10">
        {mangas && mangas.length > 0 ? (
          mangas.map((manga) => (
            <Card
              key={manga.id}
              id={manga.id}
              title={
                manga.attributes.title.en ||
                manga.attributes.title.ja ||
                "No title"
              }
              type={manga.type}
              status={manga.attributes.status}
              description={manga.attributes.description.en}
              coverImage={getCoverImage(manga)}
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
