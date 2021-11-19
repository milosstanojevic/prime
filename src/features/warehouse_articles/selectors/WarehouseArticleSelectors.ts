import { RootState } from "../../../app";
import { getAllArticles } from "../../articles";
import { createSelector } from "@reduxjs/toolkit";
import { WarehouseArticle } from "../types";

export const getAllWarehouseArticles = (state: RootState) =>
  state.warehouse_articles.items;

export const getWarehouseArticleIds = (state: RootState) =>
  state.warehouse_articles.itemIds;

export const makeGetArticlesByWarehouseRegalPositionId = (
  warehouseId: number,
  regalId: number,
  regalPositionId: number
) => {
  return createSelector(
    getAllWarehouseArticles,
    getAllArticles,
    (warehouseArticles, articles) => {
      let positionArticles: WarehouseArticle[] = [];
      let items: WarehouseArticle[] = [];

      Object.values(warehouseArticles).forEach((warehouseArticle) => {
        if (
          warehouseArticle.warehouseId === warehouseId &&
          warehouseArticle.regalId === regalId &&
          warehouseArticle.regalPositionId === regalPositionId
        ) {
          positionArticles.push(warehouseArticle);
        }
      });

      positionArticles.forEach((positionArticle) => {
        const article = articles.find(
          (article) => article.id === positionArticle.articleId
        );
        if (article) {
          items.push({
            id: article.id,
            name: article.name,
            barCode: article.barCode,
            unit: article.unit,
            quantity: positionArticle.quantity,
          });
        }
      });

      return items;
    }
  );
};
