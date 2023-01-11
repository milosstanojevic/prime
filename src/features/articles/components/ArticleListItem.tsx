import React from 'react';
import styles from './ArticleListItem.module.css';
import { formatDate, Menu } from '../../../components';
import { Button, Modal } from '../../../components';
import { ArticleForm } from '../article';
import { useArticleContext } from '../context';
import bars from '../../../components/base/images/bars.png';
import { Article } from '../types';

export const ArticleListItem: React.FC = () => {
    const { removeArticle, article, updateArticle } = useArticleContext();
    const { id, name, serial, unit, created, updated, description } = article;

    const [showArticleEdit, setShowArticleEdit] = React.useState(false);
    const [showArticleTrash, setShowArticleTrash] = React.useState(false);
    const [menuOpen, setMenuOpen] = React.useState(false);

    const handleShowArticleEdit = React.useCallback(() => {
        setShowArticleEdit(true);
    }, []);

    const handleCloseArticleEdit = React.useCallback(() => {
        setShowArticleEdit(false);
    }, []);

    const handleShowArticleTrash = React.useCallback(() => {
        setShowArticleTrash(true);
    }, []);

    const handleCloseArticleTrash = React.useCallback(() => {
        setShowArticleTrash(false);
    }, []);

    const handleArticleTrash = React.useCallback(() => {
        if (id) {
            removeArticle(id);
            handleCloseArticleTrash();
            setMenuOpen(false);
        }
    }, [id, removeArticle, handleCloseArticleTrash]);

    const handleArticleEdit = React.useCallback(
        (attributes: Article) => {
            if (id) {
                updateArticle(attributes);
                handleCloseArticleEdit();
                setMenuOpen(false);
            }
        },
        [id, updateArticle, handleCloseArticleEdit]
    );

    return (
        <>
            <div className={styles.item}>
                <div className={styles.item_element}>{id}</div>
                <div className={styles.item_element}>{name}</div>
                <div className={styles.item_element}>{serial}</div>
                <div className={styles.item_element}>{unit}</div>
                <div className={styles.item_element}>
                    {created?.length ? formatDate(+created, 'PPpp') : 'Undefined'}
                </div>
                <div className={styles.item_element}>
                    {updated?.length ? formatDate(+updated, 'PPpp') : 'Undefined'}
                </div>
                <div className={styles.item_element}>
                    <p dangerouslySetInnerHTML={{ __html: description || '' }} />
                </div>
                <div className={styles.item_element}>
                    <Menu
                        externalControls={[menuOpen, setMenuOpen]}
                        target={
                            <div>
                                <img src={bars} alt="menu" height={24} width={24} />
                            </div>
                        }
                    >
                        <div className={styles.menu}>
                            <div onClick={handleShowArticleEdit} className={styles.menu_item}>
                                Edit
                            </div>
                            <div onClick={handleShowArticleTrash} className={styles.menu_item}>
                                Trash
                            </div>
                        </div>
                    </Menu>
                </div>
            </div>
            <Modal open={showArticleEdit} onClose={handleCloseArticleEdit}>
                <div className={styles.modal_form_wrapper}>
                    <ArticleForm
                        {...article}
                        onCancel={handleCloseArticleEdit}
                        onSubmit={handleArticleEdit}
                    />
                </div>
            </Modal>
            <Modal open={showArticleTrash} onClose={handleCloseArticleTrash}>
                <div className={styles.modal_trash_wrapper}>
                    <p>Are you sure you want to trash article: {name}?</p>
                    <Button type="button" onClick={handleArticleTrash}>
                        Trash
                    </Button>
                    <Button type="button" onClick={handleCloseArticleTrash}>
                        Cancel
                    </Button>
                </div>
            </Modal>
        </>
    );
};
