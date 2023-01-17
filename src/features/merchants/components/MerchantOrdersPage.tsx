import { Button, Loading } from '../../../components';
import {
    useAddTransportOrder,
    useGetParentTransportOrders
} from '../../../features/transport_orders';
import React from 'react';
import { MerchantsOrderList } from './MerchantOrdersList';
import { useNavigate, useParams } from 'react-router-dom';
import hasOwnProperty from '../../../utils/hasOwnProperty';

export const MerchantOrdersPage: React.FC = () => {
    const params = useParams();
    const id = Number(params.id);
    const navigate = useNavigate();

    const { data: orders, isLoading, refetch } = useGetParentTransportOrders('merchant', id);

    const mutateAdd = useAddTransportOrder();

    const handleCreateOrder = React.useCallback(async () => {
        await mutateAdd.mutateAsync({ parent: 'merchant', parent_id: id });
    }, [id, mutateAdd]);

    React.useEffect(() => {
        const { data } = mutateAdd;
        if (data && hasOwnProperty(data?.data, 'id') && typeof data?.data.id === 'number') {
            refetch();
            navigate(`/orders/${data.data.id}`);
        }
    }, [navigate, mutateAdd, refetch]);

    return (
        <div>
            <Button onClick={handleCreateOrder} disabled={mutateAdd.isLoading}>
                Create Order
            </Button>
            {isLoading ? (
                <Loading />
            ) : (
                <MerchantsOrderList refetchOrders={refetch} orders={orders} id={id} />
            )}
        </div>
    );
};
