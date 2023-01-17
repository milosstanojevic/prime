import React from 'react';
import styles from './TransportPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetTransportRoute } from '..';
import { Button } from '../../../components';

export const TransportPage: React.FC = () => {
    const params = useParams();
    const id = Number(params.transportId);
    const navigate = useNavigate();
    const goToAddOrders = React.useCallback(() => {
        navigate(`/transport-routes/${id}/orders`);
    }, [navigate, id]);

    const { data: transport } = useGetTransportRoute(id);

    return (
        <div className={styles.transport_wrapper}>
            <div>{transport?.name}</div>
            <Button onClick={goToAddOrders}>Show Orders</Button>
        </div>
    );
};
