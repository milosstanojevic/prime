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
    <Route exact path="/merchants" component={MerchantsPage} />
    <Route
      path="/merchants/:id"
      render={({ match, ...props }) => (
        <MerchantPage {...props} id={Number(match.params.id)} />
      )}
    />
    <Route
      path="/merchants/:id/articles"
      render={({ match, ...props }) => (
        <MerchantArticlesPage {...props} id={Number(match.params.id)} />
      )}
    />
    <Route
      path="/merchants/:id/orders"
      render={({ match, ...props }) => (
        <MerchantOrdersPage {...props} id={Number(match.params.id)} />
      )}
    />
  </>
);
