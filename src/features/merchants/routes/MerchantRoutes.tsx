import React from 'react';
import { Route } from 'react-router-dom';
import { MerchantPage, MerchantsPage } from "../components";

export const MerchantRoutes = () => (
  <>
    <Route exact path="/merchants" component={MerchantsPage} />
    <Route
      path="/merchant/:id"
      render={({ match, ...props }) => (
        <MerchantPage
          {...props}
          id={Number(match.params.id)}
        />
      )}
    />
  </>
);
