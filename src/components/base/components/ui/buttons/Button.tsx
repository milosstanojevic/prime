import React from "react";
import styles from "./Button.module.css";

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  mode?: "primary" | "secondary" | "link";
}

export const Button = React.forwardRef<HTMLButtonElement, IButton>(
  ({ children, mode = "primary", className, ...args }, ref) => {
    return (
      <button
        className={`${styles.button} ${styles[mode]} ${className}`}
        {...args}
        ref={ref}
      >
        {children}
      </button>
    );
  }
);
