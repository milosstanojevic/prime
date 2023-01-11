import { getTransportOrderStatusLabel } from 'features/transport_orders';
import { TransportOrder } from 'features/transport_orders/types';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AddedTransportOrderListItem.module.css';

type Props = {
    transportOrder: TransportOrder;
    transportId: number;
};

export const ArrivedCompletedOrder: React.FC<Props> = ({ transportOrder, transportId }) => {
    const transportOrderStatus = transportOrder?.status ? +transportOrder.status : undefined;

    return (
        <div className={styles.page}>
            <div className={styles.item}>
                <Link to={`/transport-routes/${transportId}/orders/${transportOrder.id}`}>
                    Order - {transportOrder.id}
                </Link>
            </div>
            <div className={styles.item}>{getTransportOrderStatusLabel(transportOrderStatus)}</div>
        </div>
    );
};
