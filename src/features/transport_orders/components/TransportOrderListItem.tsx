import { Button } from 'components';
import { getTransportOrderStatusLabel, useTransportOrderContext } from 'features/transport_orders';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './TransportOrderListItem.module.css';

interface TransportOrderListItemProps {}

export const TransportOrderListItem: React.FC<TransportOrderListItemProps> = () => {
    const { transportOrder, removeTransportOrder } = useTransportOrderContext();
    const { id, status } = transportOrder;

    const statusLabel = React.useMemo(() => {
        return getTransportOrderStatusLabel(status ? +status : 1);
    }, [status]);

    return (
        <div className={styles.item}>
            <div className={styles.item_element}>{id}</div>
            <div className={styles.item_element}>{transportOrder.parent}</div>
            <div className={styles.item_element}>{statusLabel}</div>
            <div className={styles.item_element}>
                <Link to={{ pathname: `/orders/${id}` }}>{`Order-${id}`}</Link>
            </div>
            <div className={styles.last_element}>
                <Button onClick={removeTransportOrder}>Remove</Button>
            </div>
        </div>
    );
};
