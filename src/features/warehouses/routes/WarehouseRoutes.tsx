import React from "react";
import { Route, Routes } from "react-router-dom";
import { WarehousesPage } from "../components";
import { WarehouseArticlesPage } from "../../warehouse_articles";
import { WarehouseMembers } from "../../warehouse_members";
import { WarehouseTransports } from "../../warehouse_transports";

export const WarehouseRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<WarehousesPage />} />
      <Route
        path="/warehouse/:id/articles"
        element={<WarehouseArticlesPage />}
      />
      <Route path="/warehouse/:id/members" element={<WarehouseMembers />} />
      <Route
        path="/warehouse/:id/transports"
        element={<WarehouseTransports />}
      />
    </Routes>
  );
};
