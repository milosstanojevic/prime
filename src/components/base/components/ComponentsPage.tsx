import React, {useState, useCallback, useMemo} from 'react';
import styles from './ComponentsPage.module.css';
import {
  Checkbox,
  Input,
  Button,
  Modal,
  Menu,
  Select,
  Bubble,
  SelectMode,
  SidePicker,
  DatePicker,
} from "./ui";

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
  const [selectIds, setSelectIds] = useState([]);
  const [selectMultipleIds, setSelectMultipleIds] = useState([]);
  const [sidePickerId, setSidePickerId] = useState(0);

  const openModal = useCallback(() => {
    setShowModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const handleSelectChange = useCallback((ids) => {
    setSelectIds(ids)
  }, [])

  const singleSelect = useMemo(() => {
    if (selectIds.length) {
      const option = options.find(({ id }) => id === selectIds[0])
      return <Button>{option ? option.name : 'Not found'}</Button>
    }
    return <Button>Single Select...</Button>
  }, [selectIds])

  const multiSelect = useMemo(() => {
    if (selectMultipleIds.length) {
      const selectedOptions = options.filter(({ id }) => selectMultipleIds.some(selectedId => selectedId === id))
      const names = selectedOptions.map(({ name }) => name).toString()
      return <Button>{names}</Button>
    }
    return <Button>Multi Select...</Button>
  }, [selectMultipleIds])

  const handleMultipleSelectChange = useCallback((ids) => {
    setSelectMultipleIds(ids)
  }, [])

  const handleSidePickerChange = useCallback((id) => {
    setSidePickerId(id)
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
          <Bubble>
            <div className={styles.menu_item}>Option 1</div>
            <div className={styles.menu_item}>Option 2</div>
          </Bubble>
        </Menu>
      </div>
      <div className={styles.component_item}>
        <div className={styles.label}>Single Select</div>
        <Select
          options={options}
          target={singleSelect}
          onChange={handleSelectChange}
          selectedOptionIds={selectIds}
          defaultOption="Select None"
        />
      </div>
      <div className={styles.component_item}>
        <div className={styles.label}>Multi Select</div>
        <Select
          options={options}
          target={multiSelect}
          onChange={handleMultipleSelectChange}
          selectedOptionIds={selectMultipleIds}
          mode={SelectMode.multiple}
          defaultOption="Select None"
        />
      </div>
      <div className={styles.component_item}>
        <div className={styles.label}>Side Picker</div>
        <SidePicker
          options={options}
          onChange={handleSidePickerChange}
          selectedId={sidePickerId}
        />
      </div>
      <div className={styles.component_item}>
        <div className={styles.label}>Date Picker</div>
        <DatePicker/>
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
