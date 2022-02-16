import React from "react";
import { Route, Routes } from "react-router-dom";
import { UsersPage } from "../components";

export const UserRoutes: React.FC = () => (
  <Routes>
    <Route path="/users" element={<UsersPage />} />
  </Routes>
);
