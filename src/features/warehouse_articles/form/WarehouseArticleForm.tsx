import React from "react";
import styles from "./WarehouseArticleForm.module.css";
import { Button, Input, Select, SelectOption } from "../../../components";
import { Article } from "features/articles/types";
import { useAddWarehouseArticle } from "..";
import { decamelizeKeys } from "humps";

interface IWarehouseArticleForm {
  regalId: number;
  regalPositionId: number;
  warehouseId: number;
  articles?: Article[];
}

export const WarehouseArticleForm: React.FC<IWarehouseArticleForm> = ({
  regalId,
  regalPositionId,
  warehouseId,
  articles,
}) => {
  const [show, setShow] = React.useState(false);
  const [articleId, setArticleId] = React.useState(0);
  const [quantity, setQuantity] = React.useState(0);
  const mutateAdd = useAddWarehouseArticle(warehouseId, (oldData, newData) => [
    ...oldData,
    newData,
  ]);

  const handleShow = React.useCallback(() => {
    setShow(true);
  }, []);

  const handleClose = React.useCallback(() => {
    setShow(false);
    setArticleId(0);
    setQuantity(0);
  }, []);

  const handleChange = React.useCallback((ids) => {
    setArticleId(ids[0]);
  }, []);

  const handleAdd = React.useCallback(
    (e) => {
      e.preventDefault();
      if (articleId && regalPositionId && regalId && quantity > 0) {
        const attributes = {
          articleId,
          regalId,
          regalPositionId,
          quantity,
        };
        mutateAdd.mutate(decamelizeKeys(attributes));
        setQuantity(0);
        setArticleId(0);
      }
    },
    [articleId, regalPositionId, regalId, quantity, mutateAdd]
  );

  const handleQuantityChange = React.useCallback((e) => {
    const value = parseInt(e.target.value);
    setQuantity(!isNaN(value) ? value : 0);
  }, []);

  const target = React.useMemo(() => {
    const article = articles?.find((article) => article.id === articleId);
    if (article) {
      return <Button>{article.name}</Button>;
    }
    return <Button>Choose Article</Button>;
  }, [articleId, articles]);

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
            <Button
              mode="primary"
              type="submit"
              disabled={quantity === 0 || articleId === 0}
            >
              Add
            </Button>
            <Button
              mode="secondary"
              onClick={handleClose}
              className={styles.cancel_button}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
