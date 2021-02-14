import React, { FC, useMemo, useCallback, useState, useEffect, Suspense } from "react";
import {Bubble, Button, Loading, Modal, SelectOption, SidePicker} from "../../../components";
import {WarehouseNavPills} from "../../warehouse";
import {
  addWarehouseRegal,
  fetchWarehouseRegals,
  makeGetRegalsByWarehouseId,
  RegalForm,
  RegalPage
} from "../../warehouse_regals";
import {useDispatch, useSelector} from "react-redux";
import {fetchArticles} from "../../articles";
import {fetchWarehouseArticles} from "../actions";
import styles from './WarehouseArticlesPage.module.css'
import {fetchWarehouse, makeGetWarehouseById} from "../../warehouses";
import {RootState} from "../../../app";

interface IWarehouseArticlesPage {
  id: number;
}

export const WarehouseArticlesPage: FC<IWarehouseArticlesPage> = ({
  id,
}) => {
  const dispatch = useDispatch()

  const getWarehouse = useMemo(makeGetWarehouseById, [])
  const warehouse = useSelector((state: RootState) => getWarehouse(state, id))
  const getRegals = useMemo(makeGetRegalsByWarehouseId, [])
  const regals = useSelector((state: RootState) => getRegals(state, id))
  const [regalId, setRegalId] = useState(regals.length ? regals[0].id : 0)
  const [show, setShow] = useState(false)

  useEffect( () => {
    async function fetchData() {
      await dispatch(fetchWarehouse(id))
      await dispatch(fetchArticles())
      await dispatch(fetchWarehouseArticles(id))
      await dispatch(fetchWarehouseRegals(id))
    }
    fetchData()
  }, [dispatch, id])

  useEffect(() => {
    if (regals.length) {
      setRegalId(regals[0].id)
    }
  }, [regals])

  const handleChange = useCallback((id) => {
    setRegalId(id)
  }, [])

  const handleShowModal = useCallback(() => {
    setShow(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setShow(false)
  }, [])

  const handleSubmit = useCallback((data) => {
    dispatch(addWarehouseRegal(id, data))
    handleCloseModal()
  }, [dispatch, id, handleCloseModal])

  return (
    <>
      <div className={styles.page}>
        <div className={styles.warehouse_nav}>
          <div>{warehouse.name}</div>
        </div>
        {regals.length ? (
          <div className={styles.side_picker_wrapper}>
            <Button onClick={handleShowModal}>Create Regal</Button>
            <SidePicker
              className={styles.side_picker}
              options={regals as SelectOption[]}
              selectedId={regals[0].id}
              onChange={handleChange}
            />
          </div>
        ): (
          <Button onClick={handleShowModal}>Create Regal</Button>
        )}
        <WarehouseNavPills id={id}/>
      </div>
      {regalId && regalId > 0 ? (
        <Suspense fallback={<Loading/>}>
          <RegalPage regalId={regalId} warehouseId={id}/>
        </Suspense>
      ) : null}
      <Modal
        open={show}
        onClose={handleCloseModal}
      >
        <Bubble className={styles.regal_modal}>
          <div>Create Regal</div>
          <RegalForm
            onCancel={handleCloseModal}
            onSubmit={handleSubmit}
          />
        </Bubble>
      </Modal>
    </>
  )
}
