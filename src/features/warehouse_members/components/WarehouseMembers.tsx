import React, { FC } from "react";
import { WarehouseNavPills } from "../../warehouses";

interface IWarehouseMembers {
  id: number;
}

export const WarehouseMembers: FC<IWarehouseMembers> = ({
  id,
}) => {
  return (
    <div><WarehouseNavPills id={id}/></div>
  )
}
