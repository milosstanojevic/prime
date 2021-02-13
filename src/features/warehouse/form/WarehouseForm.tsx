import React, { useCallback, useState, FC } from 'react';
import {Button, Input, Textarea} from "../../../components";
import styles from './WarehouseForm.module.css'
import {Warehouse} from "../../warehouses/types";

interface IWarehouseForm extends Warehouse {
  className?: string,
  onSubmit?: (warehouse: Warehouse) => void,
  onCancel?: () => void
}

const initialFormState = {
  id: 0,
  name: '',
  description: '',
  address: '',
};

export const WarehouseForm: FC<IWarehouseForm> = ({
  className,
  onSubmit,
  onCancel,
  id = 0,
  name,
  description,
  address,
}) => {
  const [warehouseForm, setWarehouseForm] = useState(() => {
    if (id > 0) {
      return {
        id,
        name,
        description,
        address,
      }
    }
    return initialFormState
  })

  const handleChange = useCallback(
    e => {
      const { target = {} } = e;
      const { name, value } = target;
      setWarehouseForm(prevState => ({ ...prevState, [name]: value }))
    },
    []
  );

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      if (warehouseForm.name && warehouseForm.name.length > 0 && typeof onSubmit === 'function') {
        onSubmit(warehouseForm);
      }
    },
    [onSubmit, warehouseForm]
  );

  return (
    <form
      className={`${styles.warehouse_form_wrapper} ${className}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.warehouse_form_element}>
        <Input
          required
          placeholder="Warehouse name..."
          name="name"
          id="name"
          onChange={handleChange}
          value={warehouseForm.name}
          autoFocus
        />
      </div>
      <div className={styles.warehouse_form_element}>
        <Textarea
          placeholder="..."
          onChange={handleChange}
          value={warehouseForm.description}
          name="description"
        />
      </div>
      <div className={styles.warehouse_form_element}>
        <Input
          placeholder="Address..."
          name="address"
          id="address"
          onChange={handleChange}
          value={warehouseForm.address}
        />
      </div>
      <div className={styles.buttons}>
        <Button
          mode="primary"
          disabled={typeof warehouseForm.name === 'string' && warehouseForm.name.length === 0}
          className={styles.submit_button}
          type="submit"
        >
          Submit
        </Button>
        <Button
          type="button"
          mode="secondary"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};
