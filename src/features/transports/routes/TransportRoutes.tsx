import React from "react";
import { Route } from "react-router-dom";
import { TransportsPage } from "../components";
import { TransportPage } from "../components/TransportPage";

export const TransportRoutes: React.FC = () => (
  <>
    <Route path="/transport-routes" element={<TransportsPage />} />
    <Route path="/transport-routes/:id" element={<TransportPage />} />
  </>
);
