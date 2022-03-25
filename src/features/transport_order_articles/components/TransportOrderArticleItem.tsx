import React from "react";
import { Button } from "components";
import { useTransportOrderArticleContext } from "../context";
import { getTransportOrderArticleStatus } from "../utils";
import styles from "./TransportOrderArticleItem.module.css";

export const TransportOrderArticleItem: React.FC = () => {
  const {
    orderArticle,
    isRemoveArticleDisabled,
    deleteTransportOrderArticle,
    addToStock,
    isAddToStockEnabled,
  } = useTransportOrderArticleContext();

  return (
    <div key={orderArticle.id} className={styles.list_wrapper}>
      <div className={styles.list_item}>{orderArticle.name}</div>
      <div className={styles.list_item}>
        Ordered: {orderArticle.requestedQuantity} {orderArticle.unit}
      </div>
      <div className={styles.list_item}>
        In transport: {orderArticle.transportQuantity || 0} {orderArticle.unit}
      </div>
      <div className={styles.list_item}>
        {getTransportOrderArticleStatus(orderArticle.status)}
      </div>
      <div className={styles.list_item}>Note: {orderArticle.reason || "-"}</div>
      {isAddToStockEnabled ? (
        <div className={styles.list_item}>
          <Button onClick={addToStock}>Add to Stock</Button>
        </div>
      ) : null}
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
