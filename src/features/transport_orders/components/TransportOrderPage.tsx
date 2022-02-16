import React from "react";
import { useNavigate, useParams } from "react-router-dom";
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

export const TransportOrderPage: React.FC = () => {
  const params = useParams();
  const id = Number(params.id);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
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
      <Button onClick={() => navigate(-1)}>Back</Button>
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
