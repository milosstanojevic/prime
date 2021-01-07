import React from 'react';
import { Route } from 'react-router-dom';
import {WarehousesPage} from "../WarehousesPage";
import {WarehouseMembers, WarehouseTransports, WarehouseArticles} from "../warehouse";

export const WarehouseRoutes = () => (
  <>
    <Route exact path="/" component={WarehousesPage} />
    <Route
      path="/warehouse/:id/articles"
      render={({ match, ...props }) => (
        <WarehouseArticles
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
