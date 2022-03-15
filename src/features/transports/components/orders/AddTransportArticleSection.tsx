import { Button, Modal } from "components";
import {
  TransportArticleForm,
  useGetTransportArticles,
} from "features/transport_articles";
import React from "react";
import { TransportArticleListItem } from "./TransportArticleListItem";
import styles from "./AddTransportArticleSection.module.css";

interface AddTransportArticleSectionProps {
  orderArticleId: number;
  articleId: number;
}

export const AddTransportArticleSection: React.FC<
  AddTransportArticleSectionProps
> = ({ orderArticleId, articleId }) => {
  const { data: transportArticles } = useGetTransportArticles(orderArticleId);
  const [show, setShow] = React.useState(false);

  const handleShow = React.useCallback(() => {
    setShow(true);
  }, []);

  const handleClose = React.useCallback(() => {
    setShow(false);
  }, []);

  return (
    <div>
      <Button onClick={handleShow}>Add Transport Article</Button>
      <Modal open={show} onClose={handleClose}>
        <div className={styles.modal_form_wrapper}>
          <h3 style={{ textAlign: "center" }}>Add Transport Article</h3>
          <TransportArticleForm
            onCancel={handleClose}
            transportArticle={{ articleId }}
          />
        </div>
      </Modal>
      {transportArticles?.length
        ? transportArticles.map((transportArticle) => (
            <TransportArticleListItem transportArticle={transportArticle} />
          ))
        : null}
    </div>
  );
};
