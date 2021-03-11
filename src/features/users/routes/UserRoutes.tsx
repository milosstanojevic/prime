import React from 'react';
import { Route } from 'react-router-dom';
import { UsersPage } from "../components";

export const UserRoutes = () => (
  <>
    <Route exact path="/users" component={UsersPage} />
  </>
);
