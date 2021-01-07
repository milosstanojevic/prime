import React from 'react';
import { Route } from 'react-router-dom';
import {MerchantsPage} from "../MerchantsPage";

export const MerchantRoutes = () => (
  <>
    <Route exact path="/merchants" component={MerchantsPage} />
  </>
);
