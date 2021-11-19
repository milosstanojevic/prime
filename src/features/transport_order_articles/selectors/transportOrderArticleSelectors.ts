import { RootState } from "../../../app";
import { createSelector } from "@reduxjs/toolkit";
import { TransportOrderArticle } from "../types";

export const getAllTransportOrderArticles = (state: RootState) =>
  state.transport_order_articles.items;
export const getTransportOrderArticleIds = (state: RootState) =>
  state.transport_order_articles.itemIds;

export const makeGetTransportOrderArticlesByTransportOrderId = (id: number) => {
  return createSelector(
    getAllTransportOrderArticles,
    (transportOrderArticles) => {
      let data: TransportOrderArticle[] = [];

      transportOrderArticles.forEach((transportOrderArticle) => {
        if (
          transportOrderArticle &&
          transportOrderArticle.transportOrderId === id
        ) {
          data.push(transportOrderArticle);
        }
      });

      return data;
    }
  );
};
