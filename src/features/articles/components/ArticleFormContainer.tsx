import React, {FC, useCallback} from "react";
import {ArticleForm} from "../article";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../../../app";
import {addArticle} from "../actions";

interface IArticleFormContainer {
  id?: number,
  onSubmit?: () => void,
  onCancel?: () => void,
}

export const ArticleFormContainer: FC<IArticleFormContainer> = ({
  id,
  onSubmit,
  onCancel,
}) => {
  const dispatch = useDispatch()

  const handleSubmit = useCallback((article) => {
    dispatch(addArticle(article))
    typeof onSubmit === 'function' && onSubmit()
  }, [dispatch, onSubmit])

  const article = useSelector(
    (state: RootState) => {
      const item = state.articles.items.find(article => article.id === id)
      if (item) {
        return item;
      }
      return {
        id: 0,
        name: '',
        description: '',
        barCode: undefined,
        unit: 'gr',
      }
    })

  return (
    <ArticleForm
      {...article}
      onCancel={onCancel}
      onSubmit={handleSubmit}
    />
  )
}
