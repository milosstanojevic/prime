import React, { FC } from "react";

interface IWarehouseArticlesPage {
  id: number;
}

export const WarehouseArticlesPage: FC<IWarehouseArticlesPage> = ({
  id,
}) => {
  return (
    <div>Warehouse Articles {id}</div>
  )
}
