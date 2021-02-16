import React from 'react';
import { Route } from 'react-router-dom';
import { TransportsPage } from "../components";
import {TransportPage} from "../components/TransportPage";

export const TransportRoutes = () => (
  <>
    <Route exact path="/transport-routes" component={TransportsPage} />
    <Route
      path="/transport-routes/:id"
      render={({ match, ...props }) => (
        <TransportPage
          {...props}
          id={Number(match.params.id)}
        />
      )}
    />
  </>
);
