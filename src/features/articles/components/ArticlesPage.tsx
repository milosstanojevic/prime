import React, { useState } from "react";
import styles from "./ArticlesPage.module.css";
import { Button, Modal } from "../../../components";
import { fetchArticles, addArticle } from "../actions";
import { ArticleList } from "./ArticleList";
import { Loading } from "../../../components";
import { useDispatch } from "react-redux";
import { AppDispatch } from "app";
import { ArticleForm } from "..";

export const ArticlesPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    dispatch(fetchArticles()).finally(() => setIsLoading(false));
  }, [dispatch]);

  const [showCreateArticle, setShowCreateArticle] = React.useState(false);
  const handleShowCreateArticle = React.useCallback(() => {
    setShowCreateArticle(true);
  }, []);

  const handleCloseCreateArticle = React.useCallback(() => {
    setShowCreateArticle(false);
  }, []);

  const handleSubmit = React.useCallback(
    (attributes) => {
      dispatch(addArticle(attributes));
      handleCloseCreateArticle();
    },
    [dispatch, handleCloseCreateArticle]
  );

  return (
    <div className={styles.page}>
      <div className={styles.page_header}>
        <Button mode="primary" onClick={handleShowCreateArticle}>
          Create new Article
        </Button>
      </div>
      {isLoading ? <Loading /> : <ArticleList />}
      <Modal open={showCreateArticle} onClose={handleCloseCreateArticle}>
        <div className={styles.modal_form_wrapper}>
          <ArticleForm
            onCancel={handleCloseCreateArticle}
            onSubmit={handleSubmit}
          />
        </div>
      </Modal>
    </div>
  );
};
