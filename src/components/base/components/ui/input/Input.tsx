import React, { InputHTMLAttributes, forwardRef } from "react";
import styles from './Input.module.css'

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>((
  {
    className = "",
    type = "text",
    disabled = false,
    ...rest
  },
  ref
) => {
  return (
    <input
      ref={ref}
      type={type}
      disabled={disabled}
      className={`${styles.input} ${className}`}
      {...rest}
    />
  );
});
