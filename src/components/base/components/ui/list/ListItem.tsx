import React from 'react';
import styles from './List.module.css';

type Props = {
    children: React.ReactNode;
    pushRight?: boolean;
    className?: string;
};

export const ListItem: React.FC<Props> = ({ children, pushRight = false, className = '' }) => {
    const classNames = React.useMemo(() => {
        let addition = '';
        if (pushRight) {
            addition = `${styles.list_item_right}`;
        }
        return `${styles.list_item} ${addition} ${className}`;
    }, [pushRight, className]);

    return <div className={classNames}>{children}</div>;
};
