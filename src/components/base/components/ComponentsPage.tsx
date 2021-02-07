import React, { useState, useCallback } from 'react';
import styles from './ComponentsPage.module.css';
import {Checkbox, Input, Button, Modal, Menu, Select} from "./ui";

const options = [
  {
    id: 1,
    name: 'Option 1',
  },
  {
    id: 2,
    name: 'Option 2',
  },
  {
    id: 3,
    name: 'Option 3',
  },
  {
    id: 4,
    name: 'Option 4',
  },
  {
    id: 5,
    name: 'Option 5',
  },
  {
    id: 6,
    name: 'Option 6',
  },
  {
    id: 7,
    name: 'Option 7',
  },
  {
    id: 8,
    name: 'Option 8',
  },
  {
    id: 9,
    name: 'Option 9',
  },
  {
    id: 10,
    name: 'Option 10',
  },
]

const ComponentsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectId, setSelectId] = useState(undefined);

  const openModal = useCallback(() => {
    setShowModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const handleSelectChange = useCallback((id) => {
    setSelectId(id)
  }, [])

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
        <div className={styles.label}>Select</div>
        <Select
          options={options}
          target={<span>Select...</span>}
          onChange={handleSelectChange}
          selectedOptionId={selectId}
        />
      </div>
      <div className={styles.component_item}>
        <div className={styles.label}>Modal</div>
        <Button type="button" onClick={openModal}>Show Modal</Button>
        <Modal open={showModal} onClose={closeModal}>
          <div className={styles.modal_wrapper}>
            <div>Modal content</div>
            <Button type="button" onClick={closeModal}>Close modal</Button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ComponentsPage;
