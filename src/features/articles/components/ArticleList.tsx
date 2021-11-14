import React from "react";
import { RootState } from "app/rootReducer";
import { useSelector } from "react-redux";
import styles from "./ArticleList.module.css";
import { ArticleListItem } from "./ArticleListItem";
import { getAllArticles } from "../selectors";
import { descSort } from "../../utils";
import { ArticleProvider } from "..";

export const ArticleList = () => {
  const articles = useSelector((state: RootState) => getAllArticles(state));

  const sortedArticles = React.useMemo(() => {
    return [...articles].sort((a, b) => {
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
        <ArticleProvider key={article.id} id={article.id}>
          <ArticleListItem {...article} />
        </ArticleProvider>
      ))}
    </div>
  );
};
