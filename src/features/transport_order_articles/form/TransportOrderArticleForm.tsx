import React, { useCallback, useState, FC } from "react";
import { TransportOrderArticle } from "../types";
import {
  Button,
  Input,
  KeyCodes,
  Select,
  SelectOption,
} from "../../../components";
import styles from "./TransportOrderArticleForm.module.css";
import { useSelector } from "react-redux";
import { getAllArticles } from "features/articles";

interface ITransportOrderArticleForm {
  className?: string;
  onSubmit?: (attributes: TransportOrderArticle) => void;
  onCancel?: () => void;
  transportOrderArticle?: TransportOrderArticle;
}

export const TransportOrderArticleForm: FC<ITransportOrderArticleForm> = ({
  className,
  onSubmit,
  onCancel,
  transportOrderArticle = {},
}) => {
  const [articleForm, setArticleForm] = useState(transportOrderArticle);
  const articles = useSelector(getAllArticles);

  const isValid = React.useMemo<boolean>(() => {
    return (
      articleForm.articleId !== undefined &&
      articleForm.articleId > 0 &&
      articleForm.quantity !== undefined &&
      articleForm.quantity > 0
    );
  }, [articleForm]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (isValid && typeof onSubmit === "function") {
        onSubmit(articleForm);
      }
    },
    [onSubmit, isValid, articleForm]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === KeyCodes.enter && typeof onSubmit === "function") {
        onSubmit(e);
      } else if (e.key === KeyCodes.escape && typeof onCancel === "function") {
        onCancel();
      }
    },
    [onSubmit, onCancel]
  );

  const handleClose = React.useCallback(() => {
    onCancel && onCancel();
  }, [onCancel]);

  const handleQuantityChange = useCallback((e) => {
    const value = parseInt(e.target.value);
    const quantity = !isNaN(value) ? value : 0;
    setArticleForm((prevState) => ({ ...prevState, quantity }));
  }, []);

  const handleChange = useCallback((ids) => {
    const articleId = ids[0];
    setArticleForm((prevState) => ({ ...prevState, articleId }));
  }, []);

  const target = React.useMemo(() => {
    const article = articles.find(
      (article) => article.id === articleForm.articleId
    );
    if (article) {
      return <Button>{article.name}</Button>;
    }
    return <Button>Choose Article</Button>;
  }, [articleForm, articles]);

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.form_inner}>
        <Select
          target={target}
          selectedOptionIds={[articleForm.articleId || ""]}
          options={articles as SelectOption[]}
          onChange={handleChange}
          closeOnAction
        />
        <Input
          onChange={handleQuantityChange}
          name="quantity"
          type="number"
          value={articleForm.quantity}
          className={styles.quantity_input}
          placeholder="Add quantity..."
        />
      </div>
      <div className={styles.form_buttons}>
        <Button mode="primary" type="submit" disabled={!isValid}>
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
  );
};