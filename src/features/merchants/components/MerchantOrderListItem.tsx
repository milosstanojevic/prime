import { Button } from '../../../components';
import {
    getTransportOrderStatusLabel,
    useTransportOrderContext
} from '../../../features/transport_orders';
import React from 'react';
import { Link } from 'react-router-dom';

interface MerchantOrderListItemProps {}

export const MerchantOrderListItem: React.FC<MerchantOrderListItemProps> = () => {
    const { transportOrder, removeTransportOrder } = useTransportOrderContext();
    const { id, status } = transportOrder;

    const statusLabel = React.useMemo(() => {
        return getTransportOrderStatusLabel(status ? +status : 1);
    }, [status]);

    return (
        <tr>
            <td>{id}</td>
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
