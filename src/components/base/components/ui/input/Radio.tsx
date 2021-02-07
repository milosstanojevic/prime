import React, { InputHTMLAttributes, forwardRef } from "react";
import styles from './Radio.module.css'

export const Radio = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>((
  {
    className = "",
    ...rest
  },
  ref
) => {
  return (
    <input
      ref={ref}
      type="radio"
      className={`${styles.radio_input} ${className}`}
      {...rest}
    />
  );
});
