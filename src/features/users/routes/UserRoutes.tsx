import React from "react";
import { Route } from "react-router-dom";
import { UsersPage } from "../components";

export const UserRoutes: React.FC = () => (
  <>
    <Route path="/users" element={<UsersPage />} />
  </>
);
