import React from "react";
import { useSelector } from "react-redux";
import styles from "./WarehouseList.module.css";
import { WarehouseListItem } from "./WarehouseListItem";
import { WarehouseProvider } from "../context";
import { getWarehouseIds } from "..";

export const WarehouseList = () => {
  const warehouseIds = useSelector(getWarehouseIds);

  return (
    <div className={styles.warehouse_list}>
      {warehouseIds.map((id) => (
        <WarehouseProvider key={id} id={id}>
          <WarehouseListItem />
        </WarehouseProvider>
      ))}
    </div>
  );
};
