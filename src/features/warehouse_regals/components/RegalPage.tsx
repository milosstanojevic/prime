import React, { useCallback, useEffect, useState, FC, useMemo } from 'react';
import styles from './RegalPage.module.css';
import {
  fetchRegalPositions,
  addRegalPosition,
  RegalPositionForm,
  makeGetRegalPositionIdsByRegalId,
} from "../../warehouse_regal_positions";
import { useDispatch, useSelector } from "react-redux";
import {Bubble, Button, Loading, Modal} from "../../../components";
import {RootState} from "../../../app";
import {RegalPositionItemContainer} from "../../warehouse_regal_positions/components/RegalPositionItemContainer";

interface IRegalPage {
  regalId: number,
  warehouseId: number,
}

export const RegalPage: FC<IRegalPage> = ({
  regalId,
  warehouseId
}) => {
  const dispatch = useDispatch()
  const getRegalPositionIds = useMemo(makeGetRegalPositionIdsByRegalId, [])
  const regalPositionIds = useSelector((state: RootState) => getRegalPositionIds(state, regalId))
  const [show, setShow] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const fetch = async () => {
      await dispatch(fetchRegalPositions(regalId))
    }
    fetch()
      .then(() => setIsLoading(false))
      .finally(() => setIsLoading(false))
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
      {isLoading ? (
        <Loading/>
      ): (
        <div className={styles.page}>
          <div className={styles.regal_positions}>
            {regalPositionIds.map(id => (
              <RegalPositionItemContainer key={id} id={id} warehouseId={warehouseId} />
            ))}
          </div>
        </div>
      )}
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
