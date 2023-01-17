import { Button, Loading, Modal } from '../../../components';
import { useGetMerchants } from '../../../features/merchants';
import React from 'react';
import { useGetTransportOrders, useAddTransportOrder } from '../api';
import { TransportOrder } from '../types';
import { TransportOrderForm } from './form/TransportOrderForm';
import { TransportOrderList } from './TransportOrderList';
import styles from './TransportOrdersPage.module.css';

export const TransportOrdersPage = () => {
    const { data: orders, isLoading, refetch } = useGetTransportOrders();
    const { data: merchants } = useGetMerchants();
    const mutateAdd = useAddTransportOrder();

    const [show, setShow] = React.useState(false);

    const handleCloseModal = () => setShow(false);
    const handleOpenModal = () => setShow(true);

    const handleCreateOrder = React.useCallback(
        (attributes: TransportOrder) => {
            mutateAdd.mutateAsync({ parent: 'merchant', parent_id: attributes.parent_id });
        },
        [mutateAdd]
    );

    return (
        <div>
            <Button onClick={handleOpenModal} disabled={mutateAdd.isLoading}>
                Create Order
            </Button>
            <Modal open={show} onClose={handleCloseModal}>
                <div className={styles.modal_form_wrapper}>
                    <div>Add Transport Order</div>
                    <TransportOrderForm
                        onCancel={handleCloseModal}
                        onSubmit={handleCreateOrder}
                        merchants={merchants || []}
                    />
                </div>
            </Modal>
            {isLoading ? (
                <Loading />
            ) : (
                <TransportOrderList orders={orders} refetchOrders={refetch} />
            )}
        </div>
    );
};
