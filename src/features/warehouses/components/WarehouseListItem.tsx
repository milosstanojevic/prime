import React from 'react';
import { Link } from 'react-router-dom';
import styles from './WarehouseListItem.module.css';
import { Button, Modal, formatDate, Bubble, Menu } from '../../../components';
import { useWarehouseContext } from '../context';
import { WarehouseForm } from '..';
import bars from '../../../components/base/images/bars.png';
import { Warehouse } from '../types';

export const WarehouseListItem: React.FC = () => {
    const { warehouse, updateWarehouse } = useWarehouseContext();
    const { id, name, description = '', address = '', createdAt } = warehouse;
    const [showWarehouseEdit, setShowWarehouseEdit] = React.useState(false);
    const [showWarehouseTrash, setShowWarehouseTrash] = React.useState(false);

    const handleShowWarehouseEdit = React.useCallback(() => {
        setShowWarehouseEdit(true);
    }, []);

    const handleCloseWarehouseEdit = React.useCallback(() => {
        setShowWarehouseEdit(false);
    }, []);

    const handleShowWarehouseTrash = React.useCallback(() => {
        setShowWarehouseTrash(true);
    }, []);

    const handleCloseWarehouseTrash = React.useCallback(() => {
        setShowWarehouseTrash(false);
    }, []);

    const onWarehouseTrash = React.useCallback(() => {
        handleCloseWarehouseTrash();
    }, [handleCloseWarehouseTrash]);

    const handleWarehouseEdit = React.useCallback(
        (attributes: Warehouse) => {
            if (id) {
                updateWarehouse(attributes);
                handleCloseWarehouseEdit();
            }
        },
        [id, updateWarehouse, handleCloseWarehouseEdit]
    );

    return (
        <>
            <div className={styles.item}>
                <div className={styles.item_element}>{id}</div>
                <div className={styles.item_element}>
                    <Link to={{ pathname: `/warehouse/${id}/articles` }}>{name}</Link>
                </div>
                <div className={styles.item_element}>{address}</div>
                <div className={styles.item_element}>
                    <p dangerouslySetInnerHTML={{ __html: description }} />
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
                            <div onClick={handleShowWarehouseEdit} className={styles.menu_item}>
                                Edit
                            </div>
                            <div onClick={handleShowWarehouseTrash} className={styles.menu_item}>
                                Trash
                            </div>
                        </Bubble>
                    </Menu>
                </div>
            </div>
            <Modal open={showWarehouseEdit} onClose={handleCloseWarehouseEdit}>
                <div className={styles.modal_form_wrapper}>
                    <WarehouseForm
                        {...warehouse}
                        onCancel={handleCloseWarehouseEdit}
                        onSubmit={handleWarehouseEdit}
                    />
                </div>
            </Modal>
            <Modal open={showWarehouseTrash} onClose={handleCloseWarehouseTrash}>
                <div className={styles.modal_trash_wrapper}>
                    <p>Are you sure you want to trash {name}?</p>
                    <Button type="button" onClick={onWarehouseTrash}>
                        Trash
                    </Button>
                    <Button type="button" onClick={handleCloseWarehouseTrash}>
                        Cancel
                    </Button>
                </div>
            </Modal>
        </>
    );
};
