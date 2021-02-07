import React, { useCallback, memo } from 'react';
import styles from './ArticleListItem.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Menu } from "../../../components";
import { Article } from "../types";

interface IArticleListItem extends Article {
  onEdit?: (id: number) => void,
  onTrash?: (id: number) => void,
}

export const ArticleListItem = memo<IArticleListItem> (({
  id,
  name,
  description = '',
  barCode,
  unit,
  onEdit,
  onTrash,
}) => {

  const handleEdit = useCallback(() => {
    if (id && id > 0 && typeof onEdit === 'function') {
      onEdit(id)
    }
  }, [id, onEdit])

  const handleTrash = useCallback(() => {
    if (id && id > 0 && typeof onTrash === 'function') {
      onTrash(id)
    }
  }, [id, onTrash])

  return (
    <div
      className={styles.item}
    >
      <div className={styles.item_element}>{id}</div>
      <div className={styles.item_element}>
        {name}
      </div>
      <div className={styles.item_element}>{barCode}</div>
      <div className={styles.item_element}>{unit}</div>
      <div className={styles.item_element}>
        <p dangerouslySetInnerHTML={{ __html: description }} />
      </div>
      <div className={styles.item_element}>
        <Menu
          target={<div><FontAwesomeIcon icon={faBars} /></div>}
        >
          <div className={styles.menu}>
            <div
              onClick={handleEdit}
              className={styles.menu_item}
            >
              Edit
            </div>
            <div
              onClick={handleTrash}
              className={styles.menu_item}
            >
              Trash
            </div>
          </div>
        </Menu>
      </div>
    </div>
  )
})
