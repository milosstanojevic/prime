import React, {FC, useCallback, useState} from 'react'
import styles from './TransportForm.module.css'
import {Button, Input} from "../../../components";
import {Transport} from "../types";

const initialFormState = {
  name: '',
  description: '',
}

interface ITransportForm {
  onSubmit?: (transport: Transport) => void,
  onCancel?: () => void,
  className?: string,
  transport?: Transport,
}

export const TransportForm: FC<ITransportForm> = ({
  onSubmit,
  onCancel,
  className,
  transport = {},
}) => {
  const [transportForm, setTransportForm] = useState({ ...initialFormState, ...transport })

  const onChange = useCallback(({ name, value }) => {
    setTransportForm({
      ...transportForm,
      [name]: value,
    })
  }, [setTransportForm, transportForm])

  const handleChange = useCallback(e => {
    const { target = {} } = e
    const { name, value } = target
    onChange({ name, value })
  }, [onChange])

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    if (transportForm.name.length > 0 && typeof onSubmit === 'function') {
      onSubmit(transportForm)
    }
  }, [onSubmit, transportForm])

  return (
    <form className={`${styles.transport_form_wrapper} ${className}`} onSubmit={handleSubmit}>
      <div className={styles.transport_form_element}>
        <Input
          required
          placeholder="Transport name..."
          name="name"
          id="name"
          onChange={handleChange}
          value={transportForm.name}
          autoFocus
        />
      </div>
      <div className={styles.buttons}>
        <Button
          type="submit"
          mode="primary"
          disabled={transportForm.name.length === 0}
          className={styles.submit_button}
        >Submit</Button>
        <Button
          mode="secondary"
          onClick={onCancel}
        >Cancel</Button>
      </div>
    </form>
  )
};
