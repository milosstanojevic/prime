import React from "react";
import styles from "./WarehouseList.module.css";
import { WarehouseListItem } from "./WarehouseListItem";
import { WarehouseProvider } from "../context";
import { Warehouse } from "../types";
import { descSort } from "features/utils";

type Props = {
  warehouses?: Warehouse[];
};

export const WarehouseList: React.FC<Props> = ({ warehouses }) => {
  const sortedWarehouses = React.useMemo(() => {
    return (warehouses || []).sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return descSort(a.createdAt, b.createdAt);
      }
      if (a.name && b.name) {
        return descSort(a.name, b.name);
      }
      return 0;
    });
  }, [warehouses]);

  return (
    <div className={styles.warehouse_list}>
      {sortedWarehouses.map((warehouse) => (
        <WarehouseProvider key={warehouse.id} warehouse={warehouse}>
          <WarehouseListItem />
        </WarehouseProvider>
      ))}
    </div>
  );
};
