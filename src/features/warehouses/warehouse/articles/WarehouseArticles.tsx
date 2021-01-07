import React, { FC } from "react";

interface IWarehouseArticles {
  id: number;
}

export const WarehouseArticles: FC<IWarehouseArticles> = ({
  id,
}) => {
  return (
    <div>Warehouse Articles {id}</div>
  )
}
