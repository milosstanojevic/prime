import React, { useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Bubble, Menu } from "../../../components";
import { Merchant } from "../types";
import styles from './MerchantListItem.module.css';

interface IMerchantListItem extends Merchant {
  onEdit?: (id: number) => void,
  onTrash?: (id: number) => void,
}

export const MerchantListItem = memo<IMerchantListItem> (({
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
    <div
      className={styles.item}
    >
      <div className={styles.item_element}>{id}</div>
      <div className={styles.item_element}>
        <Link
          to={{ pathname: `/merchant/${id}` }}
        >
          {name}
        </Link>
      </div>
      <div className={styles.item_element}>{address}</div>
      <div className={styles.item_element}>
        <p dangerouslySetInnerHTML={{ __html: description }} />
      </div>
      <div className={styles.item_element}>
        <Menu
          target={<div><FontAwesomeIcon icon={faBars} /></div>}
        >
          <Bubble className={styles.menu}>
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
          </Bubble>
        </Menu>
      </div>
    </div>
  )
})
