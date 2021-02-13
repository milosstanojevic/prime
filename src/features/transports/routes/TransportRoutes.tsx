import React from 'react';
import { Route } from 'react-router-dom';
import { TransportsPage } from "../components";

export const TransportRoutes = () => (
  <>
    <Route exact path="/transport-routes" component={TransportsPage} />
  </>
);
