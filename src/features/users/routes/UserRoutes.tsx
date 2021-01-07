import React from 'react';
import { Route } from 'react-router-dom';
import {UsersPage} from "../UsersPage";

export const UserRoutes = () => (
  <>
    <Route exact path="/users" component={UsersPage} />
  </>
);
