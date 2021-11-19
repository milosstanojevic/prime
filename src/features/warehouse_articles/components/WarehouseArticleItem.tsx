import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./WarehouseArticleItem.module.css";

interface IWarehouseArticleItem {
  id: number;
  name?: string;
  quantity?: number;
  unit?: string;
}

export const WarehouseArticleItem = React.memo<IWarehouseArticleItem>(
  ({ id, name, quantity, unit = "Kg" }) => {
    return (
      <div className={styles.item_wrapper}>
        <span>{name} </span>
        <span>
          {quantity} {unit}
        </span>
        <span className={styles.close_icon}>
          <FontAwesomeIcon icon={faTimes} />
        </span>
      </div>
    );
  }
);
