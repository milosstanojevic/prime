import React, {FC, useMemo} from 'react'
import { RootState } from 'app/rootReducer';
import { useSelector } from 'react-redux';
import styles from './ArticleList.module.css'
import {Loading} from "../../../components";
import {ArticleListItem} from "./ArticleListItem";
import {getAllArticles} from "../selectors";
import {descSort} from "../../utils";

interface IArticleList {
  onEdit?: (id: number) => void,
  onTrash?: (id: number) => void,
}

export const ArticleList: FC<IArticleList> = ({
  onEdit,
  onTrash,
}) => {
  const articles = useSelector((state: RootState) => getAllArticles(state));
  const isLoading = useSelector((state: RootState) => state.articles.isLoading);

  const sortedArticles = useMemo(() => {
  return [...articles].sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return descSort(a.createdAt, b.createdAt)
      }
      if (a.name && b.name) {
        return descSort(a.name, b.name)
      }
      return 0
    })
  }, [articles])

  return !isLoading ? (
    <div className={styles.article_list}>
      {sortedArticles.map(article => (
        <ArticleListItem
          key={article.id}
          onEdit={onEdit}
          onTrash={onTrash}
          {...article}
        />
      ))}
    </div>
  ): (
    <Loading/>
  )
}
