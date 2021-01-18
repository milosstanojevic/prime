import React, { FC } from 'react'
import { RootState } from 'app/rootReducer';
import { useSelector } from 'react-redux';
import styles from './ArticleList.module.css'
import {Loading} from "../../../components";
import {ArticleListItem} from "./ArticleListItem";

interface IArticleList {
  onEdit?: (id: number) => void,
  onTrash?: (id: number) => void,
}

export const ArticleList: FC<IArticleList> = ({
  onEdit,
  onTrash,
}) => {
  const articles = useSelector(
    (state: RootState) => state.articles.items
  );

  const isLoading = useSelector(
    (state: RootState) => state.articles.isLoading
  );

  return !isLoading ? (
    <div className={styles.article_list}>
      {articles.map(article => (
        <ArticleListItem
          key={article.id}
          id={article.id}
          name={article.name}
          description={article.description}
          barCode={article.barCode}
          unit={article.unit}
          onEdit={onEdit}
          onTrash={onTrash}
        />
      ))}
    </div>
  ): (
    <Loading/>
  )
}
