import React from 'react';
import { Button, KeyCodes, Select, SelectOption } from '../../../../components';
import styles from './TransportOrderForm.module.css';
import { TransportOrder } from 'features/transport_orders/types';
import { Merchant } from 'features/merchants/types';

interface ITransportOrderForm {
    className?: string;
    onSubmit?: (attributes: TransportOrder) => void;
    onCancel?: () => void;
    transportOrder?: TransportOrder;
    merchants: Merchant[];
}

export const TransportOrderForm: React.FC<ITransportOrderForm> = ({
    className = '',
    onSubmit,
    onCancel,
    transportOrder = {},
    merchants
}) => {
    const [transportOrderForm, setTransportOrderForm] = React.useState(transportOrder);

    const isValid = React.useMemo<boolean>(() => {
        return !!transportOrderForm.parent && !!transportOrderForm.parent_id;
    }, [transportOrderForm]);

    const handleSubmit = React.useCallback(
        (e: React.SyntheticEvent) => {
            e.preventDefault();
            if (isValid && typeof onSubmit === 'function') {
                onSubmit(transportOrderForm);
                onCancel && onCancel();
            }
        },
        [onSubmit, isValid, transportOrderForm, onCancel]
    );

    const handleKeyDown = React.useCallback(
        (e: React.KeyboardEvent<HTMLFormElement>) => {
            if (e.key === KeyCodes.enter) {
                handleSubmit(e);
            } else if (e.key === KeyCodes.escape && typeof onCancel === 'function') {
                onCancel();
            }
        },
        [handleSubmit, onCancel]
    );

    const handleClose = React.useCallback(() => {
        onCancel && onCancel();
    }, [onCancel]);

    const handleChange = React.useCallback((ids: Array<string | number>) => {
        const parent_id = +ids[0];
        setTransportOrderForm((prevState) => ({ ...prevState, parent_id, parent: 'merchant' }));
    }, []);

    const target = React.useMemo(() => {
        const merchant = merchants.find((merchant) => merchant.id === transportOrderForm.parent_id);
        if (merchant) {
            return <Button>{merchant.name}</Button>;
        }
        return <Button>Choose Merchant</Button>;
    }, [transportOrderForm, merchants]);

    return (
        <form
            className={`${styles.form} ${className}`}
            onSubmit={handleSubmit}
            onKeyDown={handleKeyDown}
        >
            <div className={styles.form_inner}>
                <Select
                    target={target}
                    selectedOptionIds={[transportOrderForm.parent_id || '']}
                    options={merchants as SelectOption[]}
                    onChange={handleChange}
                    closeOnAction
                />
            </div>
            <div className={styles.form_buttons}>
                <Button mode="primary" type="submit" disabled={!isValid}>
                    Create Order
                </Button>
                <Button mode="secondary" onClick={handleClose} className={styles.cancel_button}>
                    Cancel
                </Button>
            </div>
        </form>
    );
};
