import React from 'react';
import { Route } from 'react-router-dom';
import {TransportsPage} from "../TransportsPage";

export const TransportRoutes = () => (
  <>
    <Route exact path="/transport-routes" component={TransportsPage} />
  </>
);
