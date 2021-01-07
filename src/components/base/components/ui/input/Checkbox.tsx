import React, { InputHTMLAttributes, forwardRef } from "react";
import styles from './Checkbox.module.css';

export const Checkbox = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>((
  {
    className = "",
    disabled = false,
    ...rest
  },
  ref
) => {
  return (
    <input
      ref={ref}
      type="checkbox"
      disabled={disabled}
      className={`${styles.custom_checkbox} ${className}`}
      {...rest}
    />
  );
});
