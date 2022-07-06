import React from "react";
import styles from "./RegalPage.module.css";
import {
  RegalPositionForm,
  useGetRegalPositions,
  useAddRegalPosition,
} from "../../warehouse_regal_positions";
import { Bubble, Button, Loading, Modal } from "../../../components";
import {
  WarehouseRegalPositionProvider,
  RegalPositionItem,
} from "../../warehouse_regal_positions";
import { Article } from "features/articles/types";
import { WarehouseArticle } from "features/warehouse_articles/types";
import { RegalPosition } from "features/warehouse_regal_positions/types";

interface IRegalPage {
  regalId: number;
  warehouseId: number;
  articles?: Article[];
  warehouseArticles?: WarehouseArticle[];
}

export const RegalPage: React.FC<IRegalPage> = ({
  regalId,
  warehouseId,
  articles,
  warehouseArticles,
}) => {
  const { data: regalPositions, isLoading } = useGetRegalPositions(regalId);
  const mutateAdd = useAddRegalPosition(regalId, (oldData, newData) => [
    ...oldData,
    newData,
  ]);

  const [show, setShow] = React.useState(false);

  const handleShowModal = React.useCallback(() => {
    setShow(true);
  }, []);

  const handleCloseModal = React.useCallback(() => {
    setShow(false);
  }, []);

  const handleSubmit = React.useCallback(
    (attributes: RegalPosition) => {
      mutateAdd.mutate(attributes);
      handleCloseModal();
    },
    [mutateAdd, handleCloseModal]
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
            {regalPositions?.map((regalPosition) => (
              <WarehouseRegalPositionProvider
                regalPosition={regalPosition}
                warehouseId={warehouseId}
                regalId={regalId}
                articles={articles}
                warehouseArticles={warehouseArticles}
                key={`${warehouseId}-${regalId}-${regalPosition.id}`}
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
