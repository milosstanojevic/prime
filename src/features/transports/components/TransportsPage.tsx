import React from 'react';
import styles from './TransportsPage.module.css';
import { Button, Loading, Modal } from '../../../components';
import { TransportForm, TransportProvider, useAddTransportRoute, useGetTransportRoutes } from '..';
import { TransportListItem } from '.';
import { Transport } from '../types';

export const TransportsPage = () => {
    const { data: transports, isLoading } = useGetTransportRoutes();
    const mutateAdd = useAddTransportRoute((oldData, newData) => [...oldData, newData]);

    const [show, setShow] = React.useState(false);

    const handleShowModal = React.useCallback(() => {
        setShow(true);
    }, []);

    const handleCloseModal = React.useCallback(() => {
        setShow(false);
    }, []);

    const handleSubmit = React.useCallback(
        (attributes: Transport) => {
            mutateAdd.mutate(attributes);
            handleCloseModal();
        },
        [handleCloseModal, mutateAdd]
    );

    return (
        <div className={styles.page}>
            <div className={styles.page_header}>
                <Button mode="primary" onClick={handleShowModal}>
                    Create New Transport
                </Button>
            </div>
            {isLoading ? (
                <Loading />
            ) : (
                <div className={styles.transport_list}>
                    {transports?.map((transport) => (
                        <TransportProvider key={transport.id} transport={transport}>
                            <TransportListItem key={transport.id} />
                        </TransportProvider>
                    ))}
                </div>
            )}

            <Modal open={show} onClose={handleCloseModal}>
                <div className={styles.modal_form_wrapper}>
                    <TransportForm onSubmit={handleSubmit} onCancel={handleCloseModal} />
                </div>
            </Modal>
        </div>
    );
};
