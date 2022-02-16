import React from "react";
import {
  Bubble,
  Button,
  Loading,
  Modal,
  SelectOption,
  SidePicker,
} from "../../../components";
import {
  addWarehouseRegal,
  clearWarehouseRegals,
  fetchWarehouseRegals,
  makeGetRegalsByWarehouseId,
  RegalForm,
  RegalPage,
} from "../../warehouse_regals";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../../articles";
import { clearWarehouseArticles, fetchWarehouseArticles } from "../actions";
import styles from "./WarehouseArticlesPage.module.css";
import {
  fetchWarehouse,
  makeGetWarehouseById,
  WarehouseNavPills,
} from "../../warehouses";
import { AppDispatch } from "../../../app";
import { clearRegalPositions } from "../../warehouse_regal_positions";
import { useParams } from "react-router-dom";

export const WarehouseArticlesPage: React.FC = () => {
  const params = useParams();
  const id = Number(params.id);
  const dispatch = useDispatch<AppDispatch>();

  const getWarehouse = React.useMemo(() => makeGetWarehouseById(id), [id]);
  const warehouse = useSelector(getWarehouse);
  const getRegals = React.useMemo(() => makeGetRegalsByWarehouseId(id), [id]);
  const regals = useSelector(getRegals);
  const [regalId, setRegalId] = React.useState(
    regals.length ? regals[0].id : 0
  );
  const [show, setShow] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      await dispatch(fetchWarehouse(id));
      await dispatch(fetchArticles());
      await dispatch(fetchWarehouseArticles(id));
      await dispatch(fetchWarehouseRegals(id));
    }
    fetchData().finally(() => setLoading(false));
  }, [dispatch, id]);

  React.useEffect(() => {
    if (regals.length) {
      setRegalId(regals[0].id);
    }
  }, [regals]);

  React.useEffect(() => {
    return () => {
      dispatch(clearWarehouseArticles());
      dispatch(clearWarehouseRegals());
      dispatch(clearRegalPositions());
    };
  }, [dispatch]);

  const handleChange = React.useCallback((id) => {
    setRegalId(id);
  }, []);

  const handleShowModal = React.useCallback(() => {
    setShow(true);
  }, []);

  const handleCloseModal = React.useCallback(() => {
    setShow(false);
  }, []);

  const handleSubmit = React.useCallback(
    (data) => {
      dispatch(addWarehouseRegal(id, data));
      handleCloseModal();
    },
    [dispatch, id, handleCloseModal]
  );

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
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
            ) : (
              <Button onClick={handleShowModal}>Create Regal</Button>
            )}
            <WarehouseNavPills id={id} />
          </div>
          {regalId && regalId > 0 ? (
            <RegalPage regalId={regalId} warehouseId={id} />
          ) : null}
        </>
      )}
      <Modal open={show} onClose={handleCloseModal}>
        <Bubble className={styles.regal_modal}>
          <div>Create Regal</div>
          <RegalForm onCancel={handleCloseModal} onSubmit={handleSubmit} />
        </Bubble>
      </Modal>
    </>
  );
};
