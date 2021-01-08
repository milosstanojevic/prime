import React, { FC } from 'react'
import { RootState } from 'app/rootReducer';
import { useSelector } from 'react-redux';
import styles from './WarehouseList.module.css'
import { WarehouseListItem } from "./WarehouseListItem";
import {Loading} from "../../../components";

interface IWarehouseList {
  onEdit?: (id: number) => void,
  onTrash?: (id: number) => void,
}

export const WarehouseList: FC<IWarehouseList> = ({
  onEdit,
  onTrash,
}) => {
  const warehouses = useSelector(
    (state: RootState) => state.warehouses.items
  );

  const isLoading = useSelector(
    (state: RootState) => state.warehouses.isLoading
  );

  return !isLoading ? (
    <div className={styles.warehouse_list}>
      {warehouses.map(warehouse => (
        <WarehouseListItem
          key={warehouse.id}
          id={warehouse.id}
          name={warehouse.name}
          description={warehouse.description}
          address={warehouse.address}
          onEdit={onEdit}
          onTrash={onTrash}
        />
      ))}
    </div>
  ): (
    <Loading/>
  )
}
