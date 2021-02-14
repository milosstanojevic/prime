import React, { useCallback, useState, FC } from 'react';
import {Regal} from "../types";
import {Button, Input, KeyCodes} from "../../../components";
import styles from './RegalForm.module.css';

const initialFormState = {
  name: '',
};

interface IRegalForm {
  className?: string,
  onSubmit?: (regal: Regal) => void,
  onCancel?: () => void,
  regal?: Regal,
}

export const RegalForm: FC<IRegalForm> = ({
  className,
  onSubmit,
  onCancel,
  regal = {},
}) => {
  const [regalForm, setRegalForm] = useState({
    ...initialFormState,
    ...regal,
  });

  const onChange = useCallback(
    ({ name, value }) => {
      setRegalForm({
        ...regalForm,
        [name]: value,
      });
    },
    [setRegalForm, regalForm]
  );

  const handleChange = useCallback(
    e => {
      const { target = {} } = e;
      const { name, value } = target;
      onChange({ name, value });
    },
    [onChange]
  );

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      if (regalForm.name.length > 0 && typeof onSubmit === 'function') {
        onSubmit(regalForm);
      }
    },
    [onSubmit, regalForm]
  );

  const handleKeyDown = useCallback(
    e => {
      if (e.key === KeyCodes.enter && typeof onSubmit === 'function') {
        onSubmit(e);
      } else if (e.key === KeyCodes.escape && typeof onCancel === 'function') {
        onCancel();
      }
    },
    [onSubmit, onCancel]
  );

  return (
    <form
      className={`${styles.regal_form_wrapper} ${className}`}
      onSubmit={handleSubmit}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.regal_form_element}>
        <Input
          required
          placeholder="Regal name..."
          name="name"
          id="name"
          onChange={handleChange}
          value={regalForm.name}
          autoFocus
        />
      </div>
      <div className={styles.buttons}>
        <Button
          mode="primary"
          disabled={regalForm.name.length === 0}
          className={styles.submit_button}
        >Submit</Button>
        <Button mode="secondary" onClick={onCancel} >Cancel</Button>
      </div>
    </form>
  );
};
