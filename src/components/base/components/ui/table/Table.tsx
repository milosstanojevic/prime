import React from 'react';
import styles from './Table.module.css';
import { TableLoaderSkeleton } from './TableLoaderSkeleton';

interface TableProps {
    headers: string[];
    isLoading?: boolean;
    children?: React.ReactNode;
}

export const Table: React.FC<TableProps> = ({ headers, children, isLoading = false }) => {
    return isLoading ? (
        <TableLoaderSkeleton />
    ) : (
        <div className={styles.table_wrapper}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={`${index}-${header}`}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>{children}</tbody>
            </table>
        </div>
    );
};
