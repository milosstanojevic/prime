import React from "react";
import { Route, Routes } from "react-router-dom";
import { ArticlesPage } from "../components";

export const ArticleRoutes: React.FC = () => (
  <Routes>
    <Route path="/articles" element={<ArticlesPage />} />
  </Routes>
);
