import React, { useState, useCallback } from 'react';
import styles from './ComponentsPage.module.css';
import {Checkbox, Input, Button, Modal, Menu} from "./ui";

const ComponentsPage = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = useCallback(() => {
    setShowModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
  }, []);


  return (
    <div className={styles.components}>
      <div className={styles.label}>COMPONENTS</div>
      <div className={styles.component_item}>
        <div className={styles.label}>Buttons</div>
        <Button type="button" mode="primary">Submit</Button>
        <Button type="button" mode="secondary">Cancel</Button>
      </div>
      <div className={styles.component_item}>
        <div className={styles.label}>Inputs</div>
        <Input/>
        <Checkbox/>
      </div>
      <div className={styles.component_item}>
        <div className={styles.label}>Simple Menu</div>
        <Menu
          target={<div>Some target element (Click text)</div>}
        >
          <div className={styles.menu_wrapper}>
            <div>Option 1</div>
            <div>Option 2</div>
          </div>
        </Menu>
      </div>
      <div className={styles.component_item}>
        <div className={styles.label}>Modal</div>
        <Button type="button" onClick={openModal}>Show Modal</Button>
        <Modal open={showModal} onClose={closeModal}>
          <>
            <div>Modal content</div>
            <Button type="button" onClick={closeModal}>Close modal</Button>
          </>
        </Modal>
      </div>
    </div>
  );
};

export default ComponentsPage;
