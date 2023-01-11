import { Button, Select } from 'components';
import React from 'react';

const defaultOptions = [
    {
        id: '1',
        name: 'Pending'
    },
    {
        id: '2',
        name: 'Prepared'
    },
    {
        id: '3',
        name: 'Taken'
    },
    {
        id: '4',
        name: 'In Transport'
    },
    {
        id: '5',
        name: 'Arrived'
    },
    {
        id: '6',
        name: 'Completed'
    }
];

interface TransportOrderStatusProps {
    options?: { id: string; name: string }[];
    orderStatus?: string;
    onChange?: (orderStatus: string) => void;
}

const TransportOrderStatus: React.FC<TransportOrderStatusProps> = ({
    options = defaultOptions,
    orderStatus = '1',
    onChange
}) => {
    const selectTarget = React.useMemo(() => {
        const option = options.find(({ id }) => id === orderStatus);
        if (option) {
            return <Button>{option.name}</Button>;
        }
        return <Button>Set Status</Button>;
    }, [orderStatus, options]);

    const handleChange = React.useCallback(
        (ids: Array<string | number>) => {
            onChange && onChange(`${ids[0]}`);
        },
        [onChange]
    );

    return (
        <Select
            disableSearch
            options={options}
            target={selectTarget}
            onChange={handleChange}
            selectedOptionIds={[orderStatus]}
            closeOnAction
        />
    );
};

export default TransportOrderStatus;
