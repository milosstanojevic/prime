import React from "react";
import { useDispatch } from "react-redux";
import styles from "./WarehousesPage.module.css";
import { Button, Modal, Loading } from "../../../components";
import { WarehouseList } from "./WarehouseList";
import { fetchWarehouses, addWarehouse, clearWarehouses } from "..";
import { WarehouseForm } from "..";
import { AppDispatch } from "app";

export const WarehousesPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [showWarehouseCreate, setShowWarehouseCreate] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    dispatch(fetchWarehouses()).finally(() => setIsLoading(false));
    return () => {
      dispatch(clearWarehouses());
    };
  }, [dispatch]);

  const handleShowCreateWarehouseModal = React.useCallback(() => {
    setShowWarehouseCreate(true);
  }, []);

  const handleCloseCreateWarehouseModal = React.useCallback(() => {
    setShowWarehouseCreate(false);
  }, []);

  const onWarehouseCreate = React.useCallback(
    (attributes) => {
      dispatch(addWarehouse(attributes));
    },
    [dispatch]
  );

  return (
    <div className={styles.page}>
      <div className={styles.page_header}>
        <Button mode="primary" onClick={handleShowCreateWarehouseModal}>
          Create new Warehouse
        </Button>
      </div>
      {isLoading ? <Loading /> : <WarehouseList />}
      <Modal
        open={showWarehouseCreate}
        onClose={handleCloseCreateWarehouseModal}
      >
        <div className={styles.modal_form_wrapper}>
          <WarehouseForm
            onCancel={handleCloseCreateWarehouseModal}
            onSubmit={onWarehouseCreate}
          />
        </div>
      </Modal>
    </div>
  );
};
