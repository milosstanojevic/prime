import React from "react";
import styles from "./TransportListItem.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal, formatDate, Bubble, Menu } from "../../../components";
import { TransportForm, useTransportContext } from "..";

export const TransportListItem = React.memo(() => {
  const { transport, updateTransport } = useTransportContext();
  const { id, name, createdAt } = transport;

  const [showTransportEdit, setShowTransportEdit] = React.useState(false);
  const [showTransportTrash, setShowTransportTrash] = React.useState(false);

  const handleShowTransportEdit = React.useCallback(() => {
    setShowTransportEdit(true);
  }, []);

  const handleCloseTransportEdit = React.useCallback(() => {
    setShowTransportEdit(false);
  }, []);

  const handleShowTransportTrash = React.useCallback(() => {
    setShowTransportTrash(true);
  }, []);

  const handleCloseTransportTrash = React.useCallback(() => {
    setShowTransportTrash(false);
  }, []);

  const onTransportTrash = React.useCallback(() => {
    handleCloseTransportTrash();
  }, [handleCloseTransportTrash]);

  const handleTransportEdit = React.useCallback(
    (attributes) => {
      id && updateTransport(id, attributes);
    },
    [id, updateTransport]
  );

  return (
    <>
      <div className={styles.item}>
        <div className={styles.item_element}>#{id}</div>
        <div className={styles.item_element}>
          <Link
            to={{ pathname: `/transport-routes/${id}` }}
            className={styles.item_element}
          >
            <span>{name}</span>
          </Link>
        </div>
        <div className={styles.item_element}>
          {createdAt && createdAt > 0
            ? formatDate(createdAt * 1000, "PPpp")
            : "Undefined"}
        </div>
        <div className={styles.item_element}>
          <Menu
            target={
              <div>
                <FontAwesomeIcon icon={faBars} />
              </div>
            }
          >
            <Bubble className={styles.menu}>
              <div
                onClick={handleShowTransportEdit}
                className={styles.menu_item}
              >
                Edit
              </div>
              <div
                onClick={handleShowTransportTrash}
                className={styles.menu_item}
              >
                Trash
              </div>
            </Bubble>
          </Menu>
        </div>
      </div>
      <Modal open={showTransportEdit} onClose={handleCloseTransportEdit}>
        <div className={styles.modal_form_wrapper}>
          <TransportForm
            {...transport}
            onCancel={handleCloseTransportEdit}
            onSubmit={handleTransportEdit}
          />
        </div>
      </Modal>
      <Modal open={showTransportTrash} onClose={handleCloseTransportTrash}>
        <div className={styles.modal_trash_wrapper}>
          <p>Are you sure you want to trash {name}?</p>
          <Button type="button" onClick={onTransportTrash}>
            Trash
          </Button>
          <Button type="button" onClick={handleCloseTransportTrash}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
});
