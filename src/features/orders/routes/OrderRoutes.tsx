import React from 'react';
import { Route } from 'react-router-dom';
import {OrdersPage} from "../OrdersPage";

export const OrderRoutes = () => (
  <>
    <Route exact path="/orders" component={OrdersPage} />
  </>
);
