import React, {ButtonHTMLAttributes, ReactNode, forwardRef} from 'react';
import styles from './Button.module.css';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  mode?: "primary" | "secondary";
}

export const Button = forwardRef<HTMLButtonElement, IButton>((
  {
    children,
    mode = "primary",
    className,
    ...args
  },
  ref
) => {
  return (
    <button
      className={`${styles.button} ${styles[mode]} ${className}`}
      {...args}
      ref={ref}
    >
      {children}
    </button>
  );
});
