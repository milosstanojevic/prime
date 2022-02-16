import React, { useState } from "react";
import styles from "./ArticleListItem.module.css";
import { formatDate, Menu } from "../../../components";
import { Article } from "../types";
import { Button, Modal } from "../../../components";
import { ArticleForm } from "../article";
import { useArticleContext } from "../context";

interface IArticleListItem extends Article {}

export const ArticleListItem = React.memo<IArticleListItem>(
  ({ id, name, description = "", barCode, unit, createdAt, updatedAt }) => {
    const { removeArticle, article, updateArticle } = useArticleContext();

    const [showArticleEdit, setShowArticleEdit] = useState(false);
    const [showArticleTrash, setShowArticleTrash] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

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
      (attributes) => {
        if (id) {
          updateArticle(id, attributes);
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
          <div className={styles.item_element}>{barCode}</div>
          <div className={styles.item_element}>{unit}</div>
          <div className={styles.item_element}>
            {createdAt && createdAt > 0
              ? formatDate(createdAt * 1000, "PPpp")
              : "Undefined"}
          </div>
          <div className={styles.item_element}>
            {updatedAt && updatedAt > 0
              ? formatDate(updatedAt * 1000, "PPpp")
              : "Undefined"}
          </div>
          <div className={styles.item_element}>
            <p dangerouslySetInnerHTML={{ __html: description }} />
          </div>
          <div className={styles.item_element}>
            <Menu
              externalControls={[menuOpen, setMenuOpen]}
              target={<div>Bars Icon</div>}
            >
              <div className={styles.menu}>
                <div
                  onClick={handleShowArticleEdit}
                  className={styles.menu_item}
                >
                  Edit
                </div>
                <div
                  onClick={handleShowArticleTrash}
                  className={styles.menu_item}
                >
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
  }
);
