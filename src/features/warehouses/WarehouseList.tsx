import React from 'react'
import WarehouseListItem from './WarehouseListItem'
import { RootState } from 'app/rootReducer';
import { useSelector } from 'react-redux';

export default function WarehouseList() {
  const warehouses = useSelector(
    (state: RootState) => state.warehouses
  );

  return (
    <ul>
      {warehouses.map(warehouse => (
        <WarehouseListItem key={warehouse.id} {...warehouse} />
      ))}
    </ul>
  );
}
