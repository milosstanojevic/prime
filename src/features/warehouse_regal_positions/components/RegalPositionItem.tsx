import React from "react";
import styles from "./RegalPositionItem.module.css";
import { useSelector } from "react-redux";
import {
  makeGetArticlesByWarehouseRegalPositionId,
  WarehouseArticleForm,
  WarehouseArticleItem,
} from "../../warehouse_articles";
import { useWarehouseRegalPositionContext } from "..";

export const RegalPositionItem = () => {
  const {
    warehouseId,
    regalPosition,
    regalId,
  } = useWarehouseRegalPositionContext();
  const { id, name } = regalPosition;

  const getRegalPositionArticles = React.useMemo(
    () =>
      makeGetArticlesByWarehouseRegalPositionId(warehouseId, regalId, id || 0),
    [id, warehouseId, regalId]
  );

  const regalPositionArticles = useSelector(getRegalPositionArticles);

  return (
    <div className={styles.wrapper}>
      <div className={styles.name}>{name}</div>
      <div className={styles.wrapper_content}>
        <WarehouseArticleForm
          regalPositionId={id || 0}
          regalId={regalId}
          warehouseId={warehouseId}
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
