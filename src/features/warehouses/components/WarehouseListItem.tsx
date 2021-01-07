import React, {FC, useCallback} from 'react';
import { Link } from 'react-router-dom';
import {Warehouse} from "../types";
import styles from './WarehouseListItem.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import {Menu} from "../../../components";

interface IWarehouseListItem extends Warehouse {
  onEdit?: (id: number) => void,
  onTrash?: (id: number) => void,
}

export const WarehouseListItem: FC<IWarehouseListItem> = ({
  id,
  name,
  description = '',
  address = '',
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
    <Link
      to={{ pathname: `/warehouse/${id}/articles` }}
      className={styles.item}
    >
      <div className={styles.item_element}>{id}</div>
      <div className={styles.item_element}>{name}</div>
      <div className={styles.item_element}>{address}</div>
      <div className={styles.item_element}>
        <p dangerouslySetInnerHTML={{ __html: description }} />
      </div>
      <div className={styles.item_element}>
        <Menu
          target={<FontAwesomeIcon icon={faBars} />}
        >
          <div className={styles.menu}>
            <button
              type="button"
              onClick={handleEdit}
              className={styles.menu_item}
            >
              Edit
            </button>
            <button
              type="button"
              onClick={handleTrash}
              className={styles.menu_item}
            >
              Trash
            </button>
          </div>
        </Menu>
      </div>
    </Link>
  )
}
