import { Button } from '../../../components';
import {
    getTransportOrderStatusLabel,
    useTransportOrderContext
} from '../../../features/transport_orders';
import React from 'react';
import { Link } from 'react-router-dom';

interface TransportOrderListItemProps {}

export const TransportOrderListItem: React.FC<TransportOrderListItemProps> = () => {
    const { transportOrder, removeTransportOrder } = useTransportOrderContext();
    const { id, status } = transportOrder;

    const statusLabel = React.useMemo(() => {
        return getTransportOrderStatusLabel(status ? +status : 1);
    }, [status]);

    return (
        <tr>
            <td>{id}</td>
            <td>{transportOrder.parent}</td>
            <td>{statusLabel}</td>
            <td>
                <Link to={{ pathname: `/orders/${id}` }}>{`Order-${id}`}</Link>
            </td>
            <td>
                <Button onClick={removeTransportOrder}>Remove</Button>
            </td>
        </tr>
    );
};
