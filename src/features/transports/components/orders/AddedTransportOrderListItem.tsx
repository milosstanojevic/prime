import { Button } from '../../../../components';
import { getTransportOrderStatusLabel } from '../../../../features/transport_orders';
import TransportOrderStatus from '../../../../features/transport_orders/components/transport_order_status';
import { TransportOrder } from '../../../../features/transport_orders/types';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AddedTransportOrderListItem.module.css';

type Props = {
    onRemoveOrder: (orderId: number) => void;
    onUpdateOrderStatus: (orderId: number, status: string) => void;
    transportOrder: TransportOrder;
    transportId: number;
};

export const AddedTransportOrderListItem: React.FC<Props> = ({
    onRemoveOrder,
    transportOrder,
    onUpdateOrderStatus,
    transportId
}) => {
    const transportOrderStatus = transportOrder?.status ? +transportOrder.status : undefined;
    const handleRemoveOrder = React.useCallback(() => {
        transportOrder.id && onRemoveOrder(transportOrder.id);
    }, [transportOrder, onRemoveOrder]);

    const handleChangeOrderStatus = React.useCallback(
        (status: string) => {
            transportOrder.id && onUpdateOrderStatus(transportOrder.id, status);
        },
        [transportOrder, onUpdateOrderStatus]
    );

    return (
        <div className={styles.page}>
            <div className={styles.item}>
                <Link to={`/transport-routes/${transportId}/orders/${transportOrder.id}`}>
                    Order - {transportOrder.id}
                </Link>
            </div>
            <div className={styles.item}>{getTransportOrderStatusLabel(transportOrderStatus)}</div>
            <div className={styles.item}>
                <TransportOrderStatus
                    options={[
                        {
                            id: '3',
                            name: 'Taken'
                        },
                        {
                            id: '4',
                            name: 'In Transport'
                        },
                        {
                            id: '5',
                            name: 'Arrived'
                        }
                    ]}
                    orderStatus={transportOrder.status}
                    onChange={handleChangeOrderStatus}
                />
            </div>
            <div className={styles.item}>
                <Button onClick={handleRemoveOrder}>Remove Order</Button>
            </div>
        </div>
    );
};
