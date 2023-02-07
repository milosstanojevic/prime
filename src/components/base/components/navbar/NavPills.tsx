import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavPills.module.css';

interface INavPills {
    navs: { id: number; name: string; link: string }[];
    className?: string;
}

export const NavPills: React.FC<INavPills> = ({ navs, className }): JSX.Element => {
    return (
        <div className={`${styles.pill_nav} ${className}`}>
            {navs.map(({ id, name, link }) => (
                <NavLink
                    key={id}
                    to={{ pathname: link }}
                    className={({ isActive }) => (isActive ? styles.active : undefined)}
                >
                    {name}
                </NavLink>
            ))}
        </div>
    );
};
