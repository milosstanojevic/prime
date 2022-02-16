import React from "react";
import { useParams } from "react-router-dom";
import { WarehouseNavPills } from "../../warehouses";

export const WarehouseMembers: React.FC = () => {
  const params = useParams();
  const id = Number(params.id);
  return (
    <div>
      <WarehouseNavPills id={id} />
    </div>
  );
};
