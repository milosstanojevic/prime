import React from "react";
import { Route, Routes } from "react-router-dom";
import { TransportsPage } from "../components";
import { TransportPage } from "../components/TransportPage";

export const TransportRoutes: React.FC = () => (
  <Routes>
    <Route path="/transport-routes" element={<TransportsPage />} />
    <Route path="/transport-routes/:id" element={<TransportPage />} />
  </Routes>
);
