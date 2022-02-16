import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavPills.module.css";

interface INavPills {
  navs: { id: number; name: string; link: string }[];
}

export const NavPills: React.FC<INavPills> = ({ navs }): JSX.Element => {
  return (
    <div className={styles.pill_nav}>
      {navs.map(({ id, name, link }) => (
        <NavLink
          key={id}
          to={{ pathname: link }}
          // activeClassName={styles.active}
        >
          {name}
        </NavLink>
      ))}
    </div>
  );
};
