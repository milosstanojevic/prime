import React from "react";
import { Route, Routes } from "react-router-dom";
import { TransportOrdersPage, TransportOrderPage } from "..";

export const TransportOrderRoutes: React.FC = () => (
  <Routes>
    <Route path="/orders" element={<TransportOrdersPage />} />
    <Route path="/orders/:id" element={<TransportOrderPage />} />
  </Routes>
);
