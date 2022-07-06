import React, { ReactNode, forwardRef, HtmlHTMLAttributes } from 'react';
import styles from './Bubble.module.css';

interface IBubble extends HtmlHTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

export const Bubble = forwardRef<HTMLDivElement, IBubble>(
    ({ children, className, ...args }, ref) => {
        return (
            <div className={`${styles.bubble} ${className}`} {...args} ref={ref}>
                {children}
            </div>
        );
    }
);
