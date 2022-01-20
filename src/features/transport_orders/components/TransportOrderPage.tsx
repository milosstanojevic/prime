import React from "react";
import { useHistory } from "react-router-dom";
import { Bubble, Button, Loading, Modal } from "components";
import { useDispatch, useSelector } from "react-redux";
import {
  addTransportOrderArticle,
  fetchTransportOrderArticles,
  makeGetTransportOrderArticlesByTransportOrderId,
  TransportOrderArticleForm,
} from "features/transport_order_articles";
import { fetchArticles } from "features/articles";
import { AppDispatch } from "app";
import styles from "./TransportOrderPage.module.css";

interface TransportOrderPageProps {
  id: number;
}

export const TransportOrderPage: React.FC<TransportOrderPageProps> = ({
  id,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();
  const [show, setShow] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const getOrderArticles = React.useMemo(
    () => makeGetTransportOrderArticlesByTransportOrderId(id),
    [id]
  );
  const orderArticles = useSelector(getOrderArticles);

  React.useEffect(() => {
    const getData = async () => {
      await dispatch(fetchTransportOrderArticles(id));
      await dispatch(fetchArticles());
    };

    getData().finally(() => setLoading(false));
  }, [dispatch, id]);

  const handleCloseModal = React.useCallback(() => {
    setShow(false);
  }, []);

  const handleOpenModal = React.useCallback(() => {
    setShow(true);
  }, []);

  const handleSubmit = React.useCallback(
    (attributes) => {
      dispatch(addTransportOrderArticle(id, attributes));
    },
    [id, dispatch]
  );
  return (
    <div>
      <Button onClick={history.goBack}>Back</Button>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div>{id}</div>
          <Button onClick={handleOpenModal}>Add Article</Button>
          {orderArticles.map((orderArticle) => {
            return (
              <div>
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
              />
            </Bubble>
          </Modal>
        </>
      )}
    </div>
  );
};
