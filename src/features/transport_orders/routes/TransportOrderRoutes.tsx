import React from 'react';
import { Route } from 'react-router-dom';
import { TransportOrdersPage } from "../components";

export const TransportOrderRoutes = () => (
  <>
    <Route exact path="/orders" component={TransportOrdersPage} />
  </>
);
