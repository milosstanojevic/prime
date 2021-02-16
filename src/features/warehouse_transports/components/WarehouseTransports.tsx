import React, { FC } from "react";
import {WarehouseNavPills} from "../../warehouse";

interface IWarehouseTransports {
  id: number;
}

export const WarehouseTransports: FC<IWarehouseTransports> = ({
  id,
}) => {
  return (
    <div><WarehouseNavPills id={id}/></div>
  )
}
