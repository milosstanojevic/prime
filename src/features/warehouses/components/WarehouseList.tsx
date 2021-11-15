import React from "react";
import { useSelector } from "react-redux";
import styles from "./WarehouseList.module.css";
import { WarehouseListItem } from "./WarehouseListItem";
import { WarehouseProvider } from "../context";
import { getAllWarehouses } from "..";

export const WarehouseList = () => {
  const warehouses = useSelector(getAllWarehouses);

  return (
    <div className={styles.warehouse_list}>
      {warehouses.map((warehouse) => (
        <WarehouseProvider key={warehouse.id} id={warehouse.id}>
          <WarehouseListItem {...warehouse} />
        </WarehouseProvider>
      ))}
    </div>
  );
};
