import { TransportArticle } from "features/transport_articles/types";
import React from "react";

interface TransportArticleListItemProps {
  transportArticle: TransportArticle;
}

export const TransportArticleListItem: React.FC<
  TransportArticleListItemProps
> = () => {
  return <div>List item section</div>;
};
