import React from 'react';
import styles from './WarehousesPage.module.css';
import { Button, Modal, Loading } from '../../../components';
import { WarehouseList } from './WarehouseList';
import { WarehouseForm } from '..';
import { useGetWarehouses, useAddWarehouse } from '../api';
import { Warehouse } from '../types';

export const WarehousesPage = () => {
    const { data, isLoading } = useGetWarehouses();
    const mutationAdd = useAddWarehouse((oldData, newData) => [...oldData, newData]);

    const [showWarehouseCreate, setShowWarehouseCreate] = React.useState(false);

    const handleShowCreateWarehouseModal = React.useCallback(() => {
        setShowWarehouseCreate(true);
    }, []);

    const handleCloseCreateWarehouseModal = React.useCallback(() => {
        setShowWarehouseCreate(false);
    }, []);

    const onWarehouseCreate = React.useCallback(
        (attributes: Warehouse) => {
            mutationAdd.mutateAsync(attributes);
            handleCloseCreateWarehouseModal();
        },
        [mutationAdd, handleCloseCreateWarehouseModal]
    );

    return (
        <div className={styles.page}>
            <div className={styles.page_header}>
                <Button mode="primary" onClick={handleShowCreateWarehouseModal}>
                    Create new Warehouse
                </Button>
            </div>
            {isLoading ? <Loading /> : <WarehouseList warehouses={data} />}
            <Modal open={showWarehouseCreate} onClose={handleCloseCreateWarehouseModal}>
                <div className={styles.modal_form_wrapper}>
                    <WarehouseForm
                        onCancel={handleCloseCreateWarehouseModal}
                        onSubmit={onWarehouseCreate}
                    />
                </div>
            </Modal>
        </div>
    );
};
