import React from "react";
import { Button, Input, Textarea } from "../../../components";
import styles from "./MechantForm.module.css";
import { Merchant } from "../types";
import { decamelizeKeys } from "humps";

interface IMerchantForm extends Merchant {
  className?: string;
  onSubmit?: (merchant: Merchant) => void;
  onCancel?: () => void;
}

const initialFormState = {
  id: 0,
  name: "",
  description: "",
  address: "",
};

export const MerchantForm: React.FC<IMerchantForm> = ({
  className,
  onSubmit,
  onCancel,
  id = 0,
  name,
  description,
  address,
}) => {
  const [merchantForm, setMerchantForm] = React.useState(() => {
    if (id > 0) {
      return {
        id,
        name,
        description,
        address,
      };
    }
    return initialFormState;
  });

  const handleChange = React.useCallback((e) => {
    const { target = {} } = e;
    const { name, value } = target;
    setMerchantForm((prevState) => ({ ...prevState, [name]: value }));
  }, []);

  const handleSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      if (
        merchantForm.name &&
        merchantForm.name.length > 0 &&
        typeof onSubmit === "function"
      ) {
        onSubmit(decamelizeKeys(merchantForm));
      }
    },
    [onSubmit, merchantForm]
  );

  return (
    <form
      className={`${styles.merchant_form_wrapper} ${className}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.merchant_form_element}>
        <Input
          required
          placeholder="Merchant name..."
          name="name"
          id="name"
          onChange={handleChange}
          value={merchantForm.name}
          autoFocus
        />
      </div>
      <div className={styles.merchant_form_element}>
        <Textarea
          placeholder="..."
          onChange={handleChange}
          value={merchantForm.description}
          name="description"
        />
      </div>
      <div className={styles.merchant_form_element}>
        <Input
          placeholder="Address..."
          name="address"
          id="address"
          onChange={handleChange}
          value={merchantForm.address}
        />
      </div>
      <div className={styles.buttons}>
        <Button
          mode="primary"
          disabled={
            typeof merchantForm.name === "string" &&
            merchantForm.name.length === 0
          }
          className={styles.submit_button}
          type="submit"
        >
          Submit
        </Button>
        <Button type="button" mode="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};
