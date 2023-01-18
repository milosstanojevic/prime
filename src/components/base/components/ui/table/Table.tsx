import React from 'react';
import Pagination, { PaginationProps } from '../pagination/Pagination';
import styles from './Table.module.css';
import { TableLoaderSkeleton } from './TableLoaderSkeleton';

interface TableProps {
    headers?: string[];
    isLoading?: boolean;
    children?: React.ReactNode;
    limit?: number;
    count?: number;
    pagination?: PaginationProps;
}

export const Table: React.FC<TableProps> = ({
    headers,
    children,
    isLoading = false,
    pagination
}) => {
    return isLoading ? (
        <TableLoaderSkeleton />
    ) : (
        <div className={styles.table_wrapper}>
            <table className={styles.table}>
                {headers?.length ? (
                    <thead>
                        <tr>
                            {headers?.map((header, index) => (
                                <th key={`${index}-${header}`}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                ) : null}
                <tbody>{children}</tbody>
            </table>
            {pagination?.count !== 0 ? (
                <div className={styles.paginationWrapper}>
                    <Pagination count={pagination?.count} limit={pagination?.limit || 10} />
                </div>
            ) : null}
        </div>
    );
};
