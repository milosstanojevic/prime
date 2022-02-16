import React from "react";
import { Route } from "react-router-dom";
import {
  MerchantPage,
  MerchantsPage,
  MerchantArticlesPage,
  MerchantOrdersPage,
} from "../components";

export const MerchantRoutes: React.FC = () => (
  <>
    <Route path="/merchants" element={<MerchantsPage />} />
    <Route path="/merchants/:id" element={<MerchantPage />} />
    <Route path="/merchants/:id/articles" element={<MerchantArticlesPage />} />
    <Route path="/merchants/:id/orders" element={<MerchantOrdersPage />} />
  </>
);
