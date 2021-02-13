import React from 'react';
import { Route } from 'react-router-dom';
import { WarehousesPage } from "../components";
import { WarehouseArticlesPage } from "../../warehouse_articles";
import { WarehouseMembers } from "../../warehouse_members";
import { WarehouseTransports } from "../../warehouse_transports";

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
