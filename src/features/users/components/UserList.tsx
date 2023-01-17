import React from 'react';
import styles from './WarehouseList.module.css';
import { UserListItem } from './UserListItem';
import { UserProvider } from '../context';
import { User } from '../types';

type Props = {
    users?: User[];
};

export const UserList: React.FC<Props> = ({ users }) => {
    return (
        <div>
            {users?.map((user) => (
                <UserProvider key={user.id} user={user}>
                    <UserListItem />
                </UserProvider>
            ))}
        </div>
    );
};
