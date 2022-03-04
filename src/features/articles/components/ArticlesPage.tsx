import React from "react";
import styles from "./ArticlesPage.module.css";
import { Button, Modal } from "../../../components";
import { ArticleList } from "./ArticleList";
import { Loading } from "../../../components";
import { ArticleForm } from "..";
import { useGetArticles, useAddArticle } from "../api";

export const ArticlesPage: React.FC = () => {
  const { data, isLoading } = useGetArticles();
  const mutationAdd = useAddArticle((oldData, newData) => [
    ...oldData,
    newData,
  ]);

  const [showCreateArticle, setShowCreateArticle] = React.useState(false);
  const handleShowCreateArticle = React.useCallback(() => {
    setShowCreateArticle(true);
  }, []);

  const handleCloseCreateArticle = React.useCallback(() => {
    setShowCreateArticle(false);
  }, []);

  const handleSubmit = React.useCallback(
    (attributes) => {
      mutationAdd.mutateAsync(attributes);
      handleCloseCreateArticle();
    },
    [handleCloseCreateArticle, mutationAdd]
  );

  return (
    <div className={styles.page}>
      <div className={styles.page_header}>
        <Button mode="primary" onClick={handleShowCreateArticle}>
          Create new Article
        </Button>
      </div>
      {isLoading ? <Loading /> : <ArticleList articles={data} />}
      <Modal open={showCreateArticle} onClose={handleCloseCreateArticle}>
        <div className={styles.modal_form_wrapper}>
          <ArticleForm
            onCancel={handleCloseCreateArticle}
            onSubmit={handleSubmit}
            isSubmitting={mutationAdd.isLoading}
          />
        </div>
      </Modal>
    </div>
  );
};
