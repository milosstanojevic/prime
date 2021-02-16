import React, { useCallback, memo } from "react"
import styles from './TransportListItem.module.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import {Bubble, Menu} from "../../../components";

interface ITransportListItem {
  id?: number,
  name?: string,
  onEdit?: (id: number) => void,
  onTrash?: (id: number) => void,
}

export const TransportListItem = memo<ITransportListItem>(({
  id,
  name,
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
    <div className={styles.item}>
      <span className={styles.item_element}>#{id}</span>
      <Link to={{ pathname: `/transport-routes/${id}` }} className={styles.item_element}>
        <span>{name}</span>
      </Link>
      <span>
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
      </span>
    </div>
  )
});
