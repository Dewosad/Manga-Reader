import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MangaDetail from "./pages/MangaDetail";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manga_detail" element={<MangaDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
