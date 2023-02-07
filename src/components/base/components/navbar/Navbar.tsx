import React from 'react';
import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom';
import classnames from 'classnames';
import styles from './Navbar.module.css';
import { Menu } from '../ui/menu';
import { isInDevelopmentMode } from '../../utils';
import bars from '../../images/bars.png';
import { useAuthContext } from '../../../../features/auth/context';
import { Button } from '../ui/buttons';
import { useLoggedUserContext } from '../../../../context/LoggedUserProvider';

export const Navbar: React.FC = () => {
    const [showResponsiveMenu, setShowResponsiveMenu] = React.useState(false);
    const { logout } = useAuthContext();
    const { user } = useLoggedUserContext();
    const navigate = useNavigate();

    const handleLogout = React.useCallback(() => {
        logout().finally(() => navigate('/'));
    }, [navigate, logout]);

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
                    [styles.active_responsive]: showResponsiveMenu
                })}
            >
                {isInDevelopmentMode ? (
                    <li>
                        <NavLink
                            className={({ isActive }) => {
                                return `${styles.nav_links} ${isActive ? styles.active : ''}`;
                            }}
                            to="/components"
                        >
                            Components
                        </NavLink>
                    </li>
                ) : null}
                <li>
                    <NavLink
                        className={({ isActive }) => {
                            return `${styles.nav_links} ${isActive ? styles.active : ''}`;
                        }}
                        to="/warehouses"
                    >
                        Warehouses
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive }) => {
                            return `${styles.nav_links} ${isActive ? styles.active : ''}`;
                        }}
                        to="/merchants"
                    >
                        Merchants
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive }) => {
                            return `${styles.nav_links} ${isActive ? styles.active : ''}`;
                        }}
                        to="/articles"
                    >
                        Articles
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive }) => {
                            return `${styles.nav_links} ${isActive ? styles.active : ''}`;
                        }}
                        to="/transport-routes"
                    >
                        Transports
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive }) => {
                            return `${styles.nav_links} ${isActive ? styles.active : ''}`;
                        }}
                        to="/orders"
                    >
                        Orders
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive }) => {
                            return `${styles.nav_links} ${isActive ? styles.active : ''}`;
                        }}
                        to="/users"
                    >
                        Users
                    </NavLink>
                </li>
                <li>
                    <div className={styles.nav_links}>
                        <Menu target={<span>{user?.username}</span>}>
                            <div className={styles.menu_wrapper}>
                                <div className={styles.menu_content}></div>
                            </div>
                            <div className={styles.menu}>
                                <div className={styles.menu_item}>Profile</div>
                                <div className={styles.menu_item}>
                                    <Link to="/settings">Settings</Link>
                                </div>
                                <div className={styles.menu_item}>
                                    <Button onClick={handleLogout}>Logout</Button>
                                </div>
                            </div>
                        </Menu>
                    </div>
                </li>
            </ul>
            <Outlet />
        </nav>
    );
};
