import { TransportOrder } from 'features/transport_orders/types';
import React from 'react';
import { TransportOrderProvider } from '../../transport_orders';
import { TransportOrderListItem } from './TransportOrderListItem';

interface TransportOrderListProps {
    orders?: TransportOrder[];
    refetchOrders?: () => void;
}

export const TransportOrderList: React.FC<TransportOrderListProps> = ({
    orders,
    refetchOrders
}) => {
    return (
        <div>
            {orders?.map((order) => {
                return (
                    <TransportOrderProvider
                        transportOrder={order}
                        key={order.id}
                        refetchOrders={refetchOrders}
                    >
                        <TransportOrderListItem />
                    </TransportOrderProvider>
                );
            })}
        </div>
    );
};
