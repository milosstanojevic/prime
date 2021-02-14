import React, { useCallback, useEffect, useState, FC, useMemo } from 'react';
import styles from './RegalPage.module.css';
import {
  fetchRegalPositions,
  addRegalPosition,
  makeGetRegalPositionsByRegalId,
  RegalPositionForm,
  RegalPositionItem,
} from "../../warehouse_regal_positions";
import { useDispatch, useSelector } from "react-redux";
import {Bubble, Button, Modal} from "../../../components";
import {RootState} from "../../../app";

interface IRegalPage {
  regalId: number,
  warehouseId: number,
}

export const RegalPage: FC<IRegalPage> = ({
  regalId,
  warehouseId
}) => {
  const dispatch = useDispatch()
  const getRegalPositions = useMemo(makeGetRegalPositionsByRegalId, [])
  const regalPositions = useSelector((state: RootState) => getRegalPositions(state, regalId))
  const [show, setShow] = useState(false)

  useEffect(() => {
    dispatch(fetchRegalPositions(regalId))
  }, [dispatch, regalId])

  const handleShowModal = useCallback(() => {
    setShow(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setShow(false)
  }, [])

  const handleSubmit = useCallback((data) => {
    dispatch(addRegalPosition(regalId, data))
  }, [dispatch, regalId])
  return (
    <>
      <div className={styles.header}>
        <Button mode="primary" onClick={handleShowModal}>Add Position</Button>
        <div className={styles.filters}>Filters</div>
      </div>
      <div className={styles.page}>
        <div className={styles.regal_positions}>
          {regalPositions.map(({ id, name }) => {
            if (id && id > 0 && name?.length) {
              return (
                <RegalPositionItem
                  key={id}
                  id={id}
                  name={name}
                  regalId={regalId}
                  warehouseId={warehouseId}
                />
              )
            }
            return null
          })}
        </div>
      </div>
      <Modal
        open={show}
        onClose={handleCloseModal}
      >
        <Bubble className={styles.regal_position_modal}>
          <div>Create Regal Position</div>
          <RegalPositionForm
            onCancel={handleCloseModal}
            onSubmit={handleSubmit}
          />
        </Bubble>
      </Modal>
    </>
  )
};
