import React from "react";
import { useEditArticle, useDeleteArticle } from "..";
import { Article } from "../types";

type ArticleContextType = {
  article: Article;
  updateArticle: (attributes: Article) => void;
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
  article: Article;
  children: React.ReactNode;
}

export const ArticleProvider = React.memo<IArticleProvider>(
  ({ article, children }) => {
    const mutateEdit = useEditArticle((oldArticles, newArticle) => {
      return oldArticles?.map((article) =>
        article.id === newArticle.id ? { ...article, ...newArticle } : article
      );
    });
    const mutateDelete = useDeleteArticle((oldData, id) => {
      return oldData?.filter((item) => item.id !== id);
    });

    const updateArticle = React.useCallback(
      (attributes: Article) => {
        mutateEdit.mutateAsync(attributes);
      },
      [mutateEdit]
    );

    const removeArticle = React.useCallback(
      (articleId: number) => {
        mutateDelete.mutateAsync(articleId);
      },
      [mutateDelete]
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
  }
);
