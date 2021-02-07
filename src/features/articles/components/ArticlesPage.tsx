import React, {useCallback, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import styles from "./ArticlesPage.module.css";
import {Button, Modal} from "../../../components";
import {fetchArticles, deleteArticle} from "../actions";
import {ArticleList} from "./ArticleList";
import {ArticleFormContainer} from "./ArticleFormContainer";

export const ArticlesPage = () => {
  const dispatch = useDispatch()
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

  useEffect(() => {
    dispatch(fetchArticles())
  }, [dispatch])

  const onTrash = useCallback(() => {
    if (trashId > 0) {
      dispatch(deleteArticle(trashId))
    }
  }, [dispatch, trashId])

  return (
    <div className={styles.page}>
      <div className={styles.page_header}>
        <Button
          mode="primary"
          onClick={handleShowModal}
        >
          Create new Article
        </Button>
      </div>
      <ArticleList onEdit={handleEdit} onTrash={handleTrash}/>
      <Modal open={show || editId > 0} onClose={handleCloseModal}>
        <div className={styles.modal_form_wrapper}>
          <ArticleFormContainer id={editId} onCancel={handleCloseModal} onSubmit={handleCloseModal}/>
        </div>
      </Modal>
      <Modal open={trashId > 0} onClose={handleCloseTrashModal}>
        <div className={styles.modal_trash_wrapper}>
          <p>Are you sure?</p>
          <Button type="button" onClick={onTrash}>Trash</Button>
          <Button type="button" onClick={handleCloseTrashModal}>Cancel</Button>
        </div>
      </Modal>
    </div>
  )
}
