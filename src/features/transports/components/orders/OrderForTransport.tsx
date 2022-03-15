import { Button } from "components";
import { Article } from "features/articles/types";
import { useGetTransportOrder } from "features/transport_orders";
import { useGetTransportOrderArticles } from "features/transport_order_articles";
import React from "react";
import OrderForTransportArticleItem from "./OrderForTransportArticleItem";

type Props = {
  orderId: number;
  articles?: Article[];
};

export const OrderForTransport: React.FC<Props> = ({ orderId, articles }) => {
  const { data: transportOrder } = useGetTransportOrder(orderId);
  const { data: orderArticles } = useGetTransportOrderArticles(orderId);

  const fullOrderArticles = React.useMemo(() => {
    return orderArticles?.map((orderArticle) => {
      const article =
        articles?.find((item) => item.id === orderArticle.articleId) || {};
      return { ...article, ...orderArticle };
    });
  }, [articles, orderArticles]);

  return (
    <div>
      <div>Order - {transportOrder?.id}</div>
      <Button>Take Order</Button>
      {fullOrderArticles?.map((orderArticle) => (
        <OrderForTransportArticleItem
          key={orderArticle.id}
          orderArticle={orderArticle}
        />
      ))}
    </div>
  );
};
