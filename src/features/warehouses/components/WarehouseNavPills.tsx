import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./WarehouseNavPills.module.css";

interface IWarehouseNavPills {
  id: number;
}

export const WarehouseNavPills: React.FC<IWarehouseNavPills> = ({ id }) => {
  return (
    <div className={styles.nav}>
      <NavLink
        to={{ pathname: `/warehouse/${id}/articles` }}
        activeClassName={styles.active}
      >
        Articles
      </NavLink>
      <NavLink
        to={{ pathname: `/warehouse/${id}/transports` }}
        activeClassName={styles.active}
      >
        Transports
      </NavLink>
      <NavLink
        to={{ pathname: `/warehouse/${id}/members` }}
        activeClassName={styles.active}
      >
        Users
      </NavLink>
    </div>
  );
};
