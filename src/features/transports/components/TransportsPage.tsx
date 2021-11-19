import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTransportIds } from "../selectors";
import { clearTransports, fetchTransports, addTransport } from "../actions";
import styles from "./TransportsPage.module.css";
import { Button, Modal } from "../../../components";
import { TransportForm, TransportProvider } from "..";
import { TransportListItem } from ".";

export const TransportsPage = () => {
  const dispatch = useDispatch();
  const transportIds = useSelector(getTransportIds);

  React.useEffect(() => {
    dispatch(fetchTransports());
    return () => {
      dispatch(clearTransports());
    };
  }, [dispatch]);

  const [show, setShow] = React.useState(false);

  const handleShowModal = React.useCallback(() => {
    setShow(true);
  }, []);

  const handleCloseModal = React.useCallback(() => {
    setShow(false);
  }, []);

  const handleSubmit = React.useCallback(
    (attributes) => {
      dispatch(addTransport(attributes));
      handleCloseModal();
    },
    [dispatch, handleCloseModal]
  );

  return (
    <div className={styles.page}>
      <div className={styles.page_header}>
        <Button mode="primary" onClick={handleShowModal}>
          Create New Transport
        </Button>
      </div>
      <div className={styles.transport_list}>
        {transportIds.map((id) => (
          <TransportProvider id={id}>
            <TransportListItem />
          </TransportProvider>
        ))}
      </div>
      <Modal open={show} onClose={handleCloseModal}>
        <div className={styles.modal_form_wrapper}>
          <TransportForm onSubmit={handleSubmit} onCancel={handleCloseModal} />
        </div>
      </Modal>
    </div>
  );
};
