import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ComponentsPage from "./components/ComponentsPage";
import { Navbar } from "./components";
import { WarehousesPage } from "../../features/warehouses";
import {
  MerchantArticlesPage,
  MerchantOrdersPage,
  MerchantPage,
  MerchantsPage,
} from "../../features/merchants";
import { ArticlesPage } from "../../features/articles";
import {
  TransportOrderPage,
  TransportOrdersPage,
} from "../../features/transport_orders";
import { UsersPage } from "../../features/users";
import { TransportsPage } from "../../features/transports";
import { isInDevelopmentMode } from "./utils";
import { WarehouseArticlesPage } from "features/warehouse_articles";
import { WarehouseMembers } from "features/warehouse_members";
import { WarehouseTransports } from "features/warehouse_transports";
import { TransportPage } from "features/transports/components/TransportPage";

export const Base: React.FC = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route
        path="warehouse/:id/articles"
        element={<WarehouseArticlesPage />}
      />
      <Route path="warehouse/:id/members" element={<WarehouseMembers />} />
      <Route
        path="warehouse/:id/transports"
        element={<WarehouseTransports />}
      />
      <Route path="merchants" element={<MerchantsPage />} />
      <Route path="merchants/:id" element={<MerchantPage />}>
        <Route path="articles" element={<MerchantArticlesPage />} />
        <Route path="orders" element={<MerchantOrdersPage />} />
      </Route>
      <Route path="articles" element={<ArticlesPage />} />
      <Route path="users" element={<UsersPage />} />
      <Route path="transport-routes" element={<TransportsPage />} />
      <Route path="transport-routes/:transportId" element={<TransportPage />} />
      <Route path="orders" element={<TransportOrdersPage />} />
      <Route path="orders/:id" element={<TransportOrderPage />} />
      {isInDevelopmentMode ? (
        <Route path="components" element={<ComponentsPage />} />
      ) : null}
      <Route
        path="*"
        element={
          <main style={{ padding: "1rem" }}>
            <p>There's nothing here!</p>
          </main>
        }
      />
      <Route path="/" element={<WarehousesPage />} />
    </Routes>
  </Router>
);
