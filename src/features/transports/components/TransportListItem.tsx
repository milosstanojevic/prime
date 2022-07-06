import React from 'react';
import styles from './TransportListItem.module.css';
import { Link } from 'react-router-dom';
import { Button, Modal, formatDate, Bubble, Menu } from '../../../components';
import { TransportForm, useTransportContext } from '..';
import bars from '../../../components/base/images/bars.png';
import { Transport } from '../types';

export const TransportListItem = React.memo(() => {
    const { transport, updateTransport, removeTransport } = useTransportContext();
    const { id, name, createdAt } = transport;

    const [showTransportEdit, setShowTransportEdit] = React.useState(false);
    const [showTransportTrash, setShowTransportTrash] = React.useState(false);

    const handleShowTransportEdit = React.useCallback(() => {
        setShowTransportEdit(true);
    }, []);

    const handleCloseTransportEdit = React.useCallback(() => {
        setShowTransportEdit(false);
    }, []);

    const handleShowTransportTrash = React.useCallback(() => {
        setShowTransportTrash(true);
    }, []);

    const handleCloseTransportTrash = React.useCallback(() => {
        setShowTransportTrash(false);
    }, []);

    const onTransportTrash = React.useCallback(() => {
        if (id) {
            removeTransport(id);
            handleCloseTransportTrash();
        }
    }, [handleCloseTransportTrash, removeTransport, id]);

    const handleTransportEdit = React.useCallback(
        (attributes: Transport) => {
            if (id) {
                updateTransport({ id, ...attributes });
                handleCloseTransportEdit();
            }
        },
        [id, updateTransport, handleCloseTransportEdit]
    );

    return (
        <>
            <div className={styles.item}>
                <div className={styles.item_element}>#{id}</div>
                <div className={styles.item_element}>
                    <Link to={`/transport-routes/${id}`} className={styles.item_element}>
                        <span>{name}</span>
                    </Link>
                </div>
                <div className={styles.item_element}>
                    {createdAt && createdAt > 0
                        ? formatDate(createdAt * 1000, 'PPpp')
                        : 'Undefined'}
                </div>
                <div className={styles.item_element}>
                    <Menu
                        target={
                            <div>
                                <img src={bars} alt="menu" height={24} width={24} />
                            </div>
                        }
                    >
                        <Bubble className={styles.menu}>
                            <div onClick={handleShowTransportEdit} className={styles.menu_item}>
                                Edit
                            </div>
                            <div onClick={handleShowTransportTrash} className={styles.menu_item}>
                                Trash
                            </div>
                        </Bubble>
                    </Menu>
                </div>
            </div>
            <Modal open={showTransportEdit} onClose={handleCloseTransportEdit}>
                <div className={styles.modal_form_wrapper}>
                    <TransportForm
                        transport={transport}
                        onCancel={handleCloseTransportEdit}
                        onSubmit={handleTransportEdit}
                    />
                </div>
            </Modal>
            <Modal open={showTransportTrash} onClose={handleCloseTransportTrash}>
                <div className={styles.modal_trash_wrapper}>
                    <p>Are you sure you want to trash {name}?</p>
                    <Button type="button" onClick={onTransportTrash}>
                        Trash
                    </Button>
                    <Button type="button" onClick={handleCloseTransportTrash}>
                        Cancel
                    </Button>
                </div>
            </Modal>
        </>
    );
});
