import React from "react";
import styles from "./RegalPage.module.css";
import {
  fetchRegalPositions,
  addRegalPosition,
  RegalPositionForm,
  makeGetRegalPositionIdsByRegalId,
} from "../../warehouse_regal_positions";
import { useDispatch, useSelector } from "react-redux";
import { Bubble, Button, Loading, Modal } from "../../../components";
import { AppDispatch } from "app";
import {
  WarehouseRegalPositionProvider,
  RegalPositionItem,
} from "../../warehouse_regal_positions";

interface IRegalPage {
  regalId: number;
  warehouseId: number;
}

export const RegalPage: React.FC<IRegalPage> = ({ regalId, warehouseId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const getRegalPositionIds = React.useMemo(
    () => makeGetRegalPositionIdsByRegalId(regalId),
    [regalId]
  );
  const regalPositionIds = useSelector(getRegalPositionIds);

  const [show, setShow] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);
    dispatch(fetchRegalPositions(regalId)).finally(() => setIsLoading(false));
  }, [dispatch, regalId]);

  const handleShowModal = React.useCallback(() => {
    setShow(true);
  }, []);

  const handleCloseModal = React.useCallback(() => {
    setShow(false);
  }, []);

  const handleSubmit = React.useCallback(
    (data) => {
      dispatch(addRegalPosition(regalId, data));
    },
    [dispatch, regalId]
  );
  return (
    <>
      <div className={styles.header}>
        <Button mode="primary" onClick={handleShowModal}>
          Add Position
        </Button>
        <div className={styles.filters}>Filters</div>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={styles.page}>
          <div className={styles.regal_positions}>
            {regalPositionIds.map((id) => (
              <WarehouseRegalPositionProvider
                id={id}
                warehouseId={warehouseId}
                regalId={regalId}
                key={`${warehouseId}-${id}`}
              >
                <RegalPositionItem />
              </WarehouseRegalPositionProvider>
            ))}
          </div>
        </div>
      )}
      <Modal open={show} onClose={handleCloseModal}>
        <Bubble className={styles.regal_position_modal}>
          <div>Create Regal Position</div>
          <RegalPositionForm
            onCancel={handleCloseModal}
            onSubmit={handleSubmit}
          />
        </Bubble>
      </Modal>
    </>
  );
};
