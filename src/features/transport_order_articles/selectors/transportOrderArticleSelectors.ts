import { RootState } from "../../../app";
import { createSelector } from "@reduxjs/toolkit";
import { TransportOrderArticle } from "../types";

export const getAllTransportOrderArticles = (state: RootState) => state.transport_order_articles.items

export const makeGetTransportOrderArticlesByTransportOrderId = () => {
  return createSelector(
    getAllTransportOrderArticles,
    (state: RootState, id: number) => id,
    (transportOrderArticles, id) => {
      let data: TransportOrderArticle[] = []

      transportOrderArticles.forEach(transportOrderArticle => {
        if (transportOrderArticle && transportOrderArticle.transportOrderId === id) {
          data.push(transportOrderArticle)
        }
      })

      return data
    }
  )
}
