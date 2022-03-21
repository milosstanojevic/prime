import { TransportOrderArticle } from "features/transport_order_articles/types";
import React from "react";
import { AddTransportArticleSection } from "./AddTransportArticleSection";
import styles from "./OrderForTransportArticleItem.module.css";

interface OrderForTransportArticleItemProps {
  orderArticle: TransportOrderArticle;
}

const OrderForTransportArticleItem: React.FC<
  OrderForTransportArticleItemProps
> = ({ orderArticle }) => {
  const [open, setOpen] = React.useState(false);
  const expandArticles = React.useCallback(() => {
    setOpen((prev) => !prev);
  }, []);
  return (
    <>
      <div className={styles.article_list} onClick={expandArticles}>
        <div className={styles.article_item}>{orderArticle.name}</div>
        <div className={styles.article_item}>
          Requested: {orderArticle.requestedQuantity} {orderArticle.unit}
        </div>
        <div className={styles.article_item}>{"+"}</div>
      </div>
      {open && orderArticle.id && orderArticle.articleId ? (
        <AddTransportArticleSection
          orderArticleId={orderArticle.id}
          articleId={orderArticle.articleId}
          articleName={orderArticle.name}
          requestedQuantity={orderArticle?.requestedQuantity || 0}
          unit={orderArticle.unit || "Kg"}
        />
      ) : null}
    </>
  );
};

export default OrderForTransportArticleItem;
