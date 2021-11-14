import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getArticleById } from "../selectors";
import { editArticle, deleteArticle } from "../actions";
import { Article } from "../types";
import { RootState } from "../../../app";

type ArticleContextType = {
  article: Article;
  updateArticle: (id: number, attributes: Article) => void;
  removeArticle: (id: number) => void;
};

const ArticleContext = React.createContext<ArticleContextType | undefined>(
  undefined
);

export const useArticleContext = () => {
  const ctx = React.useContext(ArticleContext);

  if (ctx === undefined) {
    throw new Error(
      `'useArticleContext' must be used within a 'ArticleContextProvider'`
    );
  }

  return ctx;
};

interface IArticleProvider {
  id?: number;
  children: React.ReactNode;
}

export const ArticleProvider = ({ id, children }: IArticleProvider) => {
  const dispatch = useDispatch();
  const article = useSelector((state: RootState) => getArticleById(state, id));

  const updateArticle = React.useCallback(
    (articleId: number, attributes: Article) => {
      dispatch(editArticle(articleId, attributes));
    },
    [dispatch]
  );

  const removeArticle = React.useCallback(
    (articleId: number) => {
      dispatch(deleteArticle(articleId));
    },
    [dispatch]
  );

  return (
    <ArticleContext.Provider
      value={{
        article,
        updateArticle,
        removeArticle,
      }}
    >
      {children}
    </ArticleContext.Provider>
  );
};
