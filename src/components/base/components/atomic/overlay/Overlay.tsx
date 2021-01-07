import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import styles from './Overlay.module.css';

interface IOverlay extends ButtonHTMLAttributes<HTMLButtonElement>{
  className?: string,
}

export const Overlay = forwardRef<HTMLButtonElement, IOverlay>((
  {
    className,
    ...rest
  },
  ref
) => {
  return (
    <button
      ref={ref}
      type="button"
      {...rest}
      tabIndex={-1}
      className={`${styles.overlay} ${className}`}
    />
  )
})
