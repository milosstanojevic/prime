import React from 'react';
import { Route } from 'react-router-dom';
import {WarehouseMembers, WarehouseTransports, WarehouseArticlesPage} from "../warehouse";
import {WarehousesPage} from "../components";

export const WarehouseRoutes = () => (
  <>
    <Route exact path="/" component={WarehousesPage} />
    <Route
      path="/warehouse/:id/articles"
      render={({ match, ...props }) => (
        <WarehouseArticlesPage
          {...props}
          id={Number(match.params.id)}
        />
      )}
    />
    <Route
      path="/warehouse/:id/members"
      render={({ match, ...props }) => (
        <WarehouseMembers
          {...props}
          id={Number(match.params.id)}
        />
      )}
    />
    <Route
      path="/warehouse/:id/transports"
      render={({ match, ...props }) => (
        <WarehouseTransports
          {...props}
          id={Number(match.params.id)}
        />
      )}
    />
  </>
);
