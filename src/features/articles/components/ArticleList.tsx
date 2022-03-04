import React from "react";
import styles from "./ArticleList.module.css";
import { ArticleListItem } from "./ArticleListItem";
import { descSort } from "../../utils";
import { ArticleProvider } from "..";
import { Article } from "../types";

type Props = {
  articles?: Article[];
};

export const ArticleList: React.FC<Props> = ({ articles }) => {
  const sortedArticles = React.useMemo(() => {
    return (articles || []).sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return descSort(a.createdAt, b.createdAt);
      }
      if (a.name && b.name) {
        return descSort(a.name, b.name);
      }
      return 0;
    });
  }, [articles]);

  return (
    <div className={styles.article_list}>
      {sortedArticles.map((article) => (
        <ArticleProvider key={article.id} article={article}>
          <ArticleListItem />
        </ArticleProvider>
      ))}
    </div>
  );
};
