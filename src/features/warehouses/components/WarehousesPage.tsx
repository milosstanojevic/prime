import React, {useCallback, useState} from "react";
import styles from './WarehousePage.module.css'
import {Button, Modal} from "../../../components";
import {WarehouseList} from "./WarehouseList";
import {WarehouseFormContainer} from "./WarehouseFormContainer";

export const WarehousesPage = () => {
  const [show, setShow] = useState(false)
  const [editId, setEditId] = useState(0)
  const [trashId, setTrashId] = useState(0)

  const handleShowModal = useCallback(() => {
    setShow(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setShow(false)
    setEditId(0)
  }, [])

  const handleEdit = useCallback((id) => {
    setEditId(id)
  }, [])

  const handleTrash = useCallback((id) => {
    setTrashId(id)
  }, [])

  const handleCloseTrashModal = useCallback(() => {
    setTrashId(0)
  }, [])

  return (
    <div className={styles.page}>
      <div className={styles.page_header}>
        <Button
          mode="primary"
          onClick={handleShowModal}
        >
          Create new Warehouse
        </Button>
      </div>
      <WarehouseList onEdit={handleEdit} onTrash={handleTrash}/>
      <Modal open={show || editId > 0} onClose={handleCloseModal}>
        <div className={styles.modal_form_wrapper}>
          <WarehouseFormContainer id={editId} />
        </div>
      </Modal>
      <Modal open={trashId > 0} onClose={handleCloseTrashModal}>
        <div className={styles.modal_trash_wrapper}>
          <p>Are you sure?</p>
          <Button type="button" onClick={handleCloseTrashModal}>Trash</Button>
        </div>
      </Modal>
    </div>
  )
}
