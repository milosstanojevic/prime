import React, { FC } from "react";

interface IWarehouseTransports {
  id: number;
}

export const WarehouseTransports: FC<IWarehouseTransports> = ({
  id,
}) => {
  return (
    <div>Warehouse Transports {id}</div>
  )
}
