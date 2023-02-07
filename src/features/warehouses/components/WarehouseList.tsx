import React from 'react';
import { WarehouseListItem } from './WarehouseListItem';
import { WarehouseProvider } from '../context';
import { Warehouse } from '../types';
import { descSort } from '../../../features/utils';
import { Table } from '../../../components';

type Props = {
    warehouses?: Warehouse[];
};

export const WarehouseList: React.FC<Props> = ({ warehouses }) => {
    const sortedWarehouses = React.useMemo(() => {
        return (warehouses || []).sort((a, b) => {
            if (a.created && b.created) {
                return descSort(a.created, b.created);
            }
            if (a.name && b.name) {
                return descSort(a.name, b.name);
            }
            return 0;
        });
    }, [warehouses]);

    return (
        <Table>
            {sortedWarehouses.map((warehouse) => (
                <WarehouseProvider key={warehouse.id} warehouse={warehouse}>
                    <WarehouseListItem />
                </WarehouseProvider>
            ))}
        </Table>
    );
};
