import React from "react";
import { NavLink, Link } from "react-router-dom";
import classnames from "classnames";
import styles from "./Navbar.module.css";
import { Menu } from "../menu";
import { isInDevelopmentMode } from "../../../utils";

export const Navbar = () => {
  const [showResponsiveMenu, setShowResponsiveMenu] = React.useState(false);

  const handleShowResponsiveMenu = React.useCallback(() => {
    setShowResponsiveMenu(!showResponsiveMenu);
  }, [showResponsiveMenu]);

  return (
    <nav className={styles.navbar}>
      <span className={styles.navbar_toggle} onClick={handleShowResponsiveMenu}>
        Bars Icon
      </span>
      <NavLink href="" className={styles.logo} exact to="/">
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
              activeClassName={styles.active}
              href=""
              className={styles.nav_links}
              exact
              to="/components"
            >
              Components
            </NavLink>
          </li>
        ) : null}
        <li>
          <NavLink
            activeClassName={styles.active}
            href=""
            className={styles.nav_links}
            exact
            to="/"
          >
            Warehouses
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName={styles.active}
            href=""
            className={styles.nav_links}
            exact
            to="/merchants"
          >
            Merchants
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName={styles.active}
            href=""
            className={styles.nav_links}
            exact
            to="/articles"
          >
            Articles
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName={styles.active}
            href=""
            className={styles.nav_links}
            exact
            to="/transport-routes"
          >
            Transports
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName={styles.active}
            href=""
            className={styles.nav_links}
            exact
            to="/orders"
          >
            Orders
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName={styles.active}
            href=""
            className={styles.nav_links}
            exact
            to="/users"
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
                  <Link to="/settings">Settings</Link>
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
