import React from 'react';
import { Table } from '../../../components';
import { TransportOrderProvider } from '../../transport_orders';
import { TransportOrder } from '../../transport_orders/types';
import { MerchantOrderListItem } from './MerchantOrderListItem';

interface MerchantsOrderListProps {
    id: number;
    orders?: TransportOrder[];
    refetchOrders?: () => void;
}

export const MerchantsOrderList: React.FC<MerchantsOrderListProps> = ({
    id,
    orders,
    refetchOrders
}) => {
    return (
        <Table>
            {orders?.map((merchantOrder) => {
                return merchantOrder?.parent_id === id ? (
                    <TransportOrderProvider
                        transportOrder={merchantOrder}
                        key={merchantOrder.id}
                        refetchOrders={refetchOrders}
                    >
                        <MerchantOrderListItem />
                    </TransportOrderProvider>
                ) : null;
            })}
        </Table>
    );
};
