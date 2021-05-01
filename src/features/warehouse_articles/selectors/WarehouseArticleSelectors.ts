import {RootState} from "../../../app";
import {getAllArticles} from "../../articles";
import {createSelector} from "@reduxjs/toolkit";
import {WarehouseArticle} from "../types";

export const getAllWarehouseArticles = (state: RootState) => state.warehouse_articles.items

export const makeGetArticlesByWarehouseRegalPositionId = () => {
  return createSelector(
    getAllWarehouseArticles,
    getAllArticles,
    (state: RootState, { warehouseId = 0 }) => warehouseId,
    (state: RootState, { regalId = 0 }) => regalId,
    (state: RootState, { regalPositionId = 0 }) => regalPositionId,
    (
      warehouseArticles,
      articles,
      warehouseId,
      regalId,
      regalPositionId
    ) => {
      let positionArticles: WarehouseArticle[] = []
      let items: WarehouseArticle[] = []

      Object.values(warehouseArticles).forEach(warehouseArticle => {
        if (
          warehouseArticle.warehouseId === warehouseId &&
          warehouseArticle.regalId === regalId &&
          warehouseArticle.regalPositionId === regalPositionId
        ) {
          positionArticles.push(warehouseArticle)
        }
      })

      positionArticles.forEach(positionArticle => {
        const article = articles.find(article => article.id === positionArticle.articleId)
        if (article) {
          items.push({
            id: article.id,
            name: article.name,
            barCode: article.barCode,
            unit: article.unit,
            quantity: positionArticle.quantity,
          })
        }
      })

      return items
    }
  )
}
