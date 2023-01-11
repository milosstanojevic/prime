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
            <div className={styles.item}>
                <div className={styles.item_element}>{id}</div>
                <div className={styles.item_element}>
                    <Link to={{ pathname: `/merchants/${id}/articles` }}>{name}</Link>
                </div>
                <div className={styles.item_element}>{address}</div>
                <div className={styles.item_element}>
                    <p dangerouslySetInnerHTML={{ __html: description }} />
                </div>
                <div className={styles.item_element}>
                    {created?.length ? formatDate(+created, 'PPpp') : 'Undefined'}
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
                            <div onClick={handleShowMerchantEdit} className={styles.menu_item}>
                                Edit
                            </div>
                            <div onClick={handleShowMerchantTrash} className={styles.menu_item}>
                                Trash
                            </div>
                        </Bubble>
                    </Menu>
                </div>
            </div>
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
