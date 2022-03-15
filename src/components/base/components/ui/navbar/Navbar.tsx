import React from "react";
import { NavLink, Link } from "react-router-dom";
import classnames from "classnames";
import styles from "./Navbar.module.css";
import { Menu } from "../menu";
import { isInDevelopmentMode } from "../../../utils";
import bars from "../../../images/bars.png";

export const Navbar = () => {
  const [showResponsiveMenu, setShowResponsiveMenu] = React.useState(false);

  const handleShowResponsiveMenu = React.useCallback(() => {
    setShowResponsiveMenu(!showResponsiveMenu);
  }, [showResponsiveMenu]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_toggle} onClick={handleShowResponsiveMenu}>
        <img src={bars} height={24} width={24} alt="menu" />
      </div>
      <NavLink className={styles.logo} to="/">
        Logo
      </NavLink>
      <ul
        className={classnames({
          [styles.main_nav]: true,
          [styles.active_responsive]: showResponsiveMenu,
        })}
      >
        {isInDevelopmentMode ? (
          <li>
            <NavLink
              // activeClassName={styles.active}
              className={styles.nav_links}
              to="components"
            >
              Components
            </NavLink>
          </li>
        ) : null}
        <li>
          <NavLink
            // activeClassName={styles.active}
            className={styles.nav_links}
            to="/"
          >
            Warehouses
          </NavLink>
        </li>
        <li>
          <NavLink
            // activeClassName={styles.active}
            className={styles.nav_links}
            to="merchants"
          >
            Merchants
          </NavLink>
        </li>
        <li>
          <NavLink
            // activeClassName={styles.active}
            className={styles.nav_links}
            to="articles"
          >
            Articles
          </NavLink>
        </li>
        <li>
          <NavLink
            // activeClassName={styles.active}
            className={styles.nav_links}
            to="transport-routes"
          >
            Transports
          </NavLink>
        </li>
        <li>
          <NavLink
            // activeClassName={styles.active}
            className={styles.nav_links}
            to="orders"
          >
            Orders
          </NavLink>
        </li>
        <li>
          <NavLink
            // activeClassName={styles.active}
            className={styles.nav_links}
            to="users"
          >
            Users
          </NavLink>
        </li>
        <li>
          <div className={styles.nav_links}>
            <Menu target={<span>Logged User name</span>}>
              <div className={styles.menu_wrapper}>
                <div className={styles.menu_content}></div>
              </div>
              <div className={styles.menu}>
                <div className={styles.menu_item}>Profile</div>
                <div className={styles.menu_item}>
                  <Link to="settings">Settings</Link>
                </div>
                <div className={styles.menu_item}>Logout</div>
              </div>
            </Menu>
          </div>
        </li>
      </ul>
    </nav>
  );
};
