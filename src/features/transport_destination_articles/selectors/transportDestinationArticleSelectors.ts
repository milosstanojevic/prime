import { RootState } from "../../../app";
import { createSelector } from "@reduxjs/toolkit";
import { TransportDestinationArticle } from "../types";

export const getAllTransportDestinationArticles = (state: RootState) => state.transport_destination_articles.items

export const makeGetTransportDestinationArticlesByDestinationId = () => {
  return createSelector(
    getAllTransportDestinationArticles,
    (state: RootState, id: number) => id,
    (transportDestinationArticles, id) => {
      let data: TransportDestinationArticle[] = []

      transportDestinationArticles.forEach(transportDestinationArticle => {
        if (transportDestinationArticle && transportDestinationArticle.transportDestinationId === id) {
          data.push(transportDestinationArticle)
        }
      })

      return data
    }
  )
}
