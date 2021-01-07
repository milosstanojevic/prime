import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ComponentsPage from "./components/ComponentsPage";
import { Navbar } from "./components";
import {WarehouseRoutes} from "../../features/warehouses";
import {MerchantRoutes} from "../../features/merchants";
import {ArticleRoutes} from "../../features/articles";
import {OrderRoutes} from "../../features/orders";
import {UserRoutes} from "../../features/users";
import {TransportRoutes} from "../../features/transports";
import {isInDevelopmentMode} from "./utils";

export const Base = () => (
  <Router>
    <Navbar />
    <WarehouseRoutes />
    <MerchantRoutes />
    <ArticleRoutes />
    <TransportRoutes />
    <OrderRoutes />
    <UserRoutes />
    {isInDevelopmentMode ? (
      <Route exact path="/components" component={ComponentsPage} />
    ) : null}
  </Router>
);
