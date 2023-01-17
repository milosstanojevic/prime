import React from 'react';
import styles from './WarehouseListItem.module.css';
import { useUserContext } from '../context';

export const UserListItem: React.FC = () => {
    const { user } = useUserContext();
    const { id, username } = user;

    return (
        <div>
            <div>{id}</div>
            <div>{username}</div>
        </div>
    );
};
