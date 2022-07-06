import React, { InputHTMLAttributes, forwardRef } from 'react';
import styles from './Input.module.css';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
    ({ className = '', ...rest }, ref) => {
        return <input ref={ref} className={`${styles.input} ${className}`} {...rest} />;
    }
);
