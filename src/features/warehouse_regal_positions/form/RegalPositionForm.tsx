import React from "react";
import styles from "./RegalPositionForm.module.css";
import { RegalPosition } from "../types";
import { Button, Input, KeyCodes } from "../../../components";

const initialFormState = {
  name: "",
};

interface IRegalPositionForm {
  className?: string;
  onSubmit?: (regalPosition: RegalPosition) => void;
  onCancel?: () => void;
  regalPosition?: RegalPosition;
}

export const RegalPositionForm: React.FC<IRegalPositionForm> = ({
  className,
  onSubmit,
  onCancel,
  regalPosition = {},
}) => {
  const [regalPositionForm, setRegalPositionForm] = React.useState({
    ...initialFormState,
    ...regalPosition,
  });

  const onChange = React.useCallback(
    ({ name, value }) => {
      setRegalPositionForm({
        ...regalPositionForm,
        [name]: value,
      });
    },
    [setRegalPositionForm, regalPositionForm]
  );

  const handleChange = React.useCallback(
    (e) => {
      const { target = {} } = e;
      const { name, value } = target;
      onChange({ name, value });
    },
    [onChange]
  );

  const handleSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      if (regalPositionForm.name.length > 0 && typeof onSubmit === "function") {
        onSubmit(regalPositionForm);
      }
    },
    [onSubmit, regalPositionForm]
  );

  const handleKeyDown = React.useCallback(
    (e) => {
      if (e.key === KeyCodes.enter && typeof onSubmit === "function") {
        onSubmit(e);
      } else if (e.key === KeyCodes.escape && typeof onCancel === "function") {
        onCancel();
      }
    },
    [onSubmit, onCancel]
  );

  return (
    <form
      className={`${styles.regal_position_form_wrapper} ${className}`}
      onSubmit={handleSubmit}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.regal_position_form_element}>
        <Input
          required
          placeholder="Position name..."
          name="name"
          id="name"
          onChange={handleChange}
          value={regalPositionForm.name}
          autoFocus
        />
      </div>
      <div className={styles.buttons}>
        <Button
          mode="primary"
          disabled={regalPositionForm.name.length === 0}
          className={styles.submit_button}
        >
          Submit
        </Button>
        <Button mode="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};
