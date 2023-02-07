import React from 'react';
import { UserListItem } from './UserListItem';
import { UserProvider } from '../context';
import { User } from '../types';
import { Table } from '../../../components';

type Props = {
    users?: User[];
};

export const UserList: React.FC<Props> = ({ users }) => {
    return (
        <Table headers={['User', 'Email', 'Joined']}>
            {users?.map((user) => (
                <UserProvider key={user.id} user={user}>
                    <UserListItem />
                </UserProvider>
            ))}
        </Table>
    );
};
