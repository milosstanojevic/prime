import React from "react";
import styles from "./RegalPositionItem.module.css";
import {
  WarehouseArticleForm,
  WarehouseArticleItem,
} from "../../warehouse_articles";
import { useWarehouseRegalPositionContext } from "..";
import { WarehouseArticle } from "features/warehouse_articles/types";

export const RegalPositionItem = () => {
  const { warehouseId, regalPosition, regalId, articles, warehouseArticles } =
    useWarehouseRegalPositionContext();
  const { id, name } = regalPosition;

  const regalPositionArticles = React.useMemo(() => {
    let positionArticles: WarehouseArticle[] = [];
    let items: WarehouseArticle[] = [];

    warehouseArticles?.forEach((warehouseArticle) => {
      if (
        warehouseArticle.warehouseId === warehouseId &&
        warehouseArticle.regalId === regalId &&
        warehouseArticle.regalPositionId === id
      ) {
        positionArticles.push(warehouseArticle);
      }
    });

    positionArticles.forEach((positionArticle) => {
      const article = articles?.find(
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
  }, [articles, warehouseArticles, id, warehouseId, regalId]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.name}>{name}</div>
      <div className={styles.wrapper_content}>
        <WarehouseArticleForm
          regalPositionId={id || 0}
          regalId={regalId}
          warehouseId={warehouseId}
          articles={articles}
        />
        <div className={styles.item}>
          {regalPositionArticles.map(({ id, name, quantity, unit }) => {
            if (id && id > 0) {
              return (
                <WarehouseArticleItem
                  key={id}
                  id={id}
                  name={name}
                  quantity={quantity}
                  unit={unit}
                />
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};
