import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import styles from "./TransportsPage.module.css";
import {addTransport, editTransport, fetchTransport} from "../actions";
import {Bubble, Button, Modal} from "../../../components";
import {TransportForm} from "../form";
import {makeGetTransportById} from "../selectors";
import {RootState} from "../../../app";

const TransportFormContainer = () => {
  const [show, setShow] = useState(false)
  const dispatch = useDispatch()
  const editId = 0
  const getTransportById = useMemo(makeGetTransportById, [])
  const transport = useSelector((state: RootState) => getTransportById(state, editId))

  useEffect(() => {
    if (!show && editId > 0) {
      dispatch(fetchTransport(editId))
      setShow(true)
    }
  }, [editId, dispatch, show])

  const handleShowModal = useCallback(() => {
    setShow(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setShow(false)
  }, [])

  const handleSubmit = useCallback((payload) => {
    dispatch(editId > 0 ? editTransport(editId, payload) : addTransport(payload))
    handleCloseModal()
  }, [dispatch, editId, handleCloseModal])

  return (
    <>
      <div className={styles.page_header}>
        <Button mode="primary" onClick={handleShowModal}>Create New Transport</Button>
      </div>
      <Modal
        open={show}
        onClose={handleCloseModal}
      >
        <Bubble className={styles.transport_modal}>
          <div>{editId ? 'Edit Transport' : 'Create Transport'}</div>
          <TransportForm
            onSubmit={handleSubmit}
            onCancel={handleCloseModal}
            transport={transport}
          />
        </Bubble>
      </Modal>
    </>
  )
}

export default TransportFormContainer
