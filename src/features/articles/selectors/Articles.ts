import { RootState } from "../../../app";
import { createSelector } from "@reduxjs/toolkit";
import { Article } from "../types";

export const getAllArticles = (state: RootState) => state.articles.items;

export const getAllArticlesArray = createSelector(
  getAllArticles,
  (articles) => {
    const data: Article[] = [];
    Object.values(articles).forEach((article) => data.push(article));
    return data;
  }
);

export const getArticleById = (state: RootState, id: number | undefined) => {
  if (!id) {
    return {
      id: 0,
      name: "",
      description: "",
      barCode: undefined,
      unit: "gr",
      updatedAt: undefined,
      createdAt: undefined,
      updatedBy: undefined,
      createdBy: undefined,
    };
  }

  const item = state.articles.items.find((article) => article.id === id);
  if (item) {
    return item;
  }

  throw Error(`Article with id=${id} not found`);
};
