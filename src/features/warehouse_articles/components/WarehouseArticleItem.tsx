import React from 'react';
import styles from './WarehouseArticleItem.module.css';

interface IWarehouseArticleItem {
    id: number;
    name?: string;
    quantity?: number;
    unit?: string;
}

export const WarehouseArticleItem = React.memo<IWarehouseArticleItem>(
    ({ name, quantity, unit = 'Kg' }) => {
        return (
            <div className={styles.item_wrapper}>
                <span>{name} </span>
                <span>
                    {quantity} {unit}
                </span>
                <span className={styles.close_icon}>X</span>
            </div>
        );
    }
);
