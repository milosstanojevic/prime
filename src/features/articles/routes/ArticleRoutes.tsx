import React from "react";
import { Route } from "react-router-dom";
import { ArticlesPage } from "../components";

export const ArticleRoutes = () => (
  <>
    <Route exact path="/articles" component={ArticlesPage} />
  </>
);
