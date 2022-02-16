import React from "react";
import { Route } from "react-router-dom";
import { TransportOrdersPage, TransportOrderPage } from "..";

export const TransportOrderRoutes: React.FC = () => (
  <>
    <Route path="/orders" element={<TransportOrdersPage />} />
    <Route path="/orders/:id" element={<TransportOrderPage />} />
  </>
);
