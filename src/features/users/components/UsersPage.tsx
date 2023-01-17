import { Loading } from '../../../components';
import React from 'react';
import { useGetUsers } from '../api';
import { UserList } from './UserList';

export const UsersPage: React.FC = () => {
    const { data, isLoading } = useGetUsers();

    return <div>{isLoading ? <Loading /> : <UserList users={data} />}</div>;
};
