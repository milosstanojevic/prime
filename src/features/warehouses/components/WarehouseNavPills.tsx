import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShippingFast,
  faClipboardList,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
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
        <FontAwesomeIcon icon={faClipboardList} />
      </NavLink>
      <NavLink
        to={{ pathname: `/warehouse/${id}/transports` }}
        activeClassName={styles.active}
      >
        <FontAwesomeIcon icon={faShippingFast} />
      </NavLink>
      <NavLink
        to={{ pathname: `/warehouse/${id}/members` }}
        activeClassName={styles.active}
      >
        <FontAwesomeIcon icon={faUsers} />
      </NavLink>
    </div>
  );
};
