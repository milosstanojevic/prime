import React, {useCallback, useState, FC, useMemo} from 'react'
import styles from './WarehouseArticleForm.module.css'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../app";
import {Button, Input, Select, SelectOption} from "../../../components";
import {getAllArticlesArray} from "../../articles";
import {addWarehouseArticle} from "../actions";

interface IWarehouseArticleForm {
  regalId: number,
  regalPositionId: number,
  warehouseId: number,
}

export const WarehouseArticleForm: FC<IWarehouseArticleForm> = ({
  regalId,
  regalPositionId,
  warehouseId,
}) => {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const [articleId, setArticleId] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const articles = useSelector((state: RootState) => getAllArticlesArray(state))

  const handleShow = useCallback(() => {
    setShow(true)
  }, [])

  const handleClose = useCallback(() => {
    setShow(false)
    setArticleId(0)
    setQuantity(0)
  }, [])

  const handleChange = useCallback((ids) => {
    setArticleId(ids[0])
  }, [])

  const handleAdd = useCallback((e) => {
    e.preventDefault()
    if (articleId && regalPositionId && regalId && quantity > 0) {
      dispatch(addWarehouseArticle(warehouseId, {
        articleId,
        regalId,
        regalPositionId,
        quantity
      }))
      setQuantity(0)
      setArticleId(0)
    }
  }, [articleId, regalPositionId, regalId, quantity, dispatch, warehouseId])

  const handleQuantityChange = useCallback((e) => {
    const value = parseInt(e.target.value)
    setQuantity(!isNaN(value) ? value : 0)
  }, [])

  const target = useMemo(() => {
    const article = articles.find(article => article.id === articleId)
    if (article) {
      return (<Button>{article.name}</Button>)
    }
    return (<Button>Choose Article</Button>)
  }, [articleId, articles])

  return (
    <div className={styles.form_wrapper}>
      {!show ? (
        <Button onClick={handleShow}>Add Article</Button>
      ) : (
        <form className={styles.form} onSubmit={handleAdd}>
          <div className={styles.form_inner}>
            <Select
              target={target}
              selectedOptionIds={[articleId]}
              options={articles as SelectOption[]}
              onChange={handleChange}
              closeOnAction
            />
            <Input
              onChange={handleQuantityChange}
              name="quantity"
              type="number"
              value={quantity}
              className={styles.quantity_input}
            />
          </div>
          <div className={styles.form_buttons}>
            <Button mode="primary" type="submit" disabled={quantity === 0 || articleId === 0}>Add</Button>
            <Button mode="secondary" onClick={handleClose} className={styles.cancel_button}>Cancel</Button>
          </div>
        </form>
      )}
    </div>
  )
}
