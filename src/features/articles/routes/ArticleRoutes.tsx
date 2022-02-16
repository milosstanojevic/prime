import React from "react";
import { Route } from "react-router-dom";
import { ArticlesPage } from "../components";

export const ArticleRoutes: React.FC = () => (
  <>
    <Route path="/articles" element={<ArticlesPage />} />
  </>
);
