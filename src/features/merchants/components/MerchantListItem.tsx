import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, formatDate, Bubble, Menu } from '../../../components';
import styles from './MerchantListItem.module.css';
import { useMerchantContext } from '..';
import { MerchantForm } from '../form';
import bars from '../../../components/base/images/bars.png';
import { Merchant } from '../types';

export const MerchantListItem = React.memo(() => {
    const { merchant, updateMerchant } = useMerchantContext();
    const { id, name, description = '', address = '', created } = merchant;
    const [showMerchantEdit, setShowMerchantEdit] = React.useState(false);
    const [showMerchantTrash, setShowMerchantTrash] = React.useState(false);

    const handleShowMerchantEdit = React.useCallback(() => {
        setShowMerchantEdit(true);
    }, []);

    const handleCloseMerchantEdit = React.useCallback(() => {
        setShowMerchantEdit(false);
    }, []);

    const handleShowMerchantTrash = React.useCallback(() => {
        setShowMerchantTrash(true);
    }, []);

    const handleCloseMerchantTrash = React.useCallback(() => {
        setShowMerchantTrash(false);
    }, []);

    const onMerchantTrash = React.useCallback(() => {
        handleCloseMerchantTrash();
    }, [handleCloseMerchantTrash]);

    const handleMerchantEdit = React.useCallback(
        (attributes: Merchant) => {
            if (id) {
                updateMerchant(attributes);
                handleCloseMerchantEdit();
            }
        },
        [id, updateMerchant, handleCloseMerchantEdit]
    );

    return (
        <>
            <tr>
                <td>{id}</td>
                <td>
                    <Link to={{ pathname: `/merchant/${id}/articles` }}>{name}</Link>
                </td>
                <td>{address}</td>
                <td>
                    <p dangerouslySetInnerHTML={{ __html: description }} />
                </td>
                <td>{created?.length ? formatDate(+created, 'PPpp') : 'Undefined'}</td>
                <td>
                    <Menu
                        target={
                            <div>
                                <img src={bars} alt="menu" height={24} width={24} />
                            </div>
                        }
                    >
                        <Bubble className={styles.menu}>
                            <div onClick={handleShowMerchantEdit} className={styles.menu_item}>
                                Edit
                            </div>
                            <div onClick={handleShowMerchantTrash} className={styles.menu_item}>
                                Trash
                            </div>
                        </Bubble>
                    </Menu>
                </td>
            </tr>
            <Modal open={showMerchantEdit} onClose={handleCloseMerchantEdit}>
                <div className={styles.modal_form_wrapper}>
                    <MerchantForm
                        {...merchant}
                        onCancel={handleCloseMerchantEdit}
                        onSubmit={handleMerchantEdit}
                    />
                </div>
            </Modal>
            <Modal open={showMerchantTrash} onClose={handleCloseMerchantTrash}>
                <div className={styles.modal_trash_wrapper}>
                    <p>Are you sure you want to trash {name}?</p>
                    <Button type="button" onClick={onMerchantTrash}>
                        Trash
                    </Button>
                    <Button type="button" onClick={handleCloseMerchantTrash}>
                        Cancel
                    </Button>
                </div>
            </Modal>
        </>
    );
});
