import React from 'react';
import { formatDate } from '../../../components';
import { useUserContext } from '../context';

export const UserListItem: React.FC = () => {
    const { user } = useUserContext();
    const { id, username, date_joined, email } = user;

    return (
        <tr>
            <td>{username}</td>
            <td>{email}</td>
            <td>{date_joined ? formatDate(+date_joined, 'PPpp') : '/'}</td>
        </tr>
    );
};
