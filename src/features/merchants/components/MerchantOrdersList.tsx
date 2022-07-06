import { TransportOrder } from 'features/transport_orders/types';
import React from 'react';
import { TransportOrderProvider } from '../../transport_orders';
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
        <div>
            {orders?.map((merchantOrder) => {
                return merchantOrder?.parentId === id ? (
                    <TransportOrderProvider
                        transportOrder={merchantOrder}
                        key={merchantOrder.id}
                        refetchOrders={refetchOrders}
                    >
                        <MerchantOrderListItem />
                    </TransportOrderProvider>
                ) : null;
            })}
        </div>
    );
};
