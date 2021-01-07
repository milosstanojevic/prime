import React, { FC } from "react";

interface IWarehouseMembers {
  id: number;
}

export const WarehouseMembers: FC<IWarehouseMembers> = ({
  id,
}) => {
  return (
    <div>Warehouse Members {id}</div>
  )
}
