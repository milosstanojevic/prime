import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Bubble, Button, Loading, Modal } from "components";
import {
  TransportOrderArticleForm,
  useAddTransportOrderArticle,
  useGetTransportOrderArticles,
} from "features/transport_order_articles";
import { useGetArticles } from "features/articles";
import styles from "./TransportOrderPage.module.css";

export const TransportOrderPage: React.FC = () => {
  const params = useParams();
  const id = Number(params.id);
  const navigate = useNavigate();
  const [show, setShow] = React.useState(false);

  const { data: orderArticles, isLoading: isOrderArticlesLoading } =
    useGetTransportOrderArticles(id);
  const { data: articles, isLoading: isArticlesLoading } = useGetArticles();

  const mutateAdd = useAddTransportOrderArticle(id, (oldData, newData) => [
    ...oldData,
    newData,
  ]);

  const isLoading = isOrderArticlesLoading || isArticlesLoading;

  const handleCloseModal = React.useCallback(() => {
    setShow(false);
  }, []);

  const handleOpenModal = React.useCallback(() => {
    setShow(true);
  }, []);

  const handleSubmit = React.useCallback(
    (attributes) => {
      mutateAdd.mutate(attributes);
      handleCloseModal();
    },
    [mutateAdd, handleCloseModal]
  );
  return (
    <div>
      <Button onClick={() => navigate(-1)}>Back</Button>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div>{id}</div>
          <Button onClick={handleOpenModal}>Add Article</Button>
          {orderArticles?.map((orderArticle) => {
            return (
              <div key={orderArticle.id}>
                {orderArticle.articleId} - {orderArticle.quantity}
              </div>
            );
          })}
          <Modal open={show} onClose={handleCloseModal}>
            <Bubble className={styles.modal_form_wrapper}>
              <div>Add Article to Order</div>
              <TransportOrderArticleForm
                onCancel={handleCloseModal}
                onSubmit={handleSubmit}
                articles={articles || []}
              />
            </Bubble>
          </Modal>
        </>
      )}
    </div>
  );
};
