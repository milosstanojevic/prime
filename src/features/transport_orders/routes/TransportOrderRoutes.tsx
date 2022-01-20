import React from "react";
import { Route } from "react-router-dom";
import { TransportOrdersPage, TransportOrderPage } from "..";

export const TransportOrderRoutes: React.FC = () => (
  <>
    <Route exact path="/orders" component={TransportOrdersPage} />
    <Route
      path="/orders/:id"
      render={({ match, ...props }) => (
        <TransportOrderPage {...props} id={Number(match.params.id)} />
      )}
    />
  </>
);
