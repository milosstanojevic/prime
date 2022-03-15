import { Button } from "components";
import React from "react";
import { useTransportOrderArticleContext } from "../context";
import styles from "./TransportOrderArticleItem.module.css";

export const TransportOrderArticleItem: React.FC = () => {
  const { orderArticle, isRemoveArticleDisabled, deleteTransportOrderArticle } =
    useTransportOrderArticleContext();

  return (
    <div key={orderArticle.id} className={styles.list_wrapper}>
      <div className={styles.list_item}>{orderArticle.name}</div>
      <div className={styles.list_item}>{orderArticle.requestedQuantity}</div>
      <div className={styles.list_item}>{orderArticle.unit}</div>
      <div className={styles.list_item}>
        <Button
          onClick={deleteTransportOrderArticle}
          disabled={isRemoveArticleDisabled}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};
