import React from 'react';
import { Table } from '../../../components';
import { TransportOrderProvider } from '../../transport_orders';
import { TransportOrder } from '../types';
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
        <Table>
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
        </Table>
    );
};
