import React, {FC, useCallback} from "react";
import {ArticleForm} from "../article";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../../../app";
import {addArticle, editArticle} from "../actions";
import {getArticleById} from "../selectors";

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
  const article = useSelector((state: RootState) => getArticleById(state, id))

  const handleSubmit = useCallback((article) => {
    id && id > 0 ? dispatch(editArticle(id, article)) : dispatch(addArticle(article))
    typeof onSubmit === 'function' && onSubmit()
  }, [dispatch, onSubmit, id])

  return (
    <ArticleForm
      {...article}
      onCancel={onCancel}
      onSubmit={handleSubmit}
    />
  )
}
