import React from 'react';
import styles from './RegalPositionForm.module.css';
import { RegalPosition } from '../types';
import { Button, Input, KeyCodes } from '../../../components';

const initialFormState = {
    name: ''
};

interface IRegalPositionForm {
    className?: string;
    onSubmit?: (regalPosition: RegalPosition) => void;
    onCancel?: () => void;
    regalPosition?: RegalPosition;
}

export const RegalPositionForm: React.FC<IRegalPositionForm> = ({
    className,
    onSubmit,
    onCancel,
    regalPosition = {}
}) => {
    const [regalPositionForm, setRegalPositionForm] = React.useState({
        ...initialFormState,
        ...regalPosition
    });

    const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { target } = e;
        const { name, value } = target;
        setRegalPositionForm((prevState) => ({ ...prevState, [name]: value }));
    }, []);

    const handleSubmit = React.useCallback(
        (e: React.SyntheticEvent) => {
            e.preventDefault();
            if (regalPositionForm.name.length > 0 && typeof onSubmit === 'function') {
                onSubmit(regalPositionForm);
            }
        },
        [onSubmit, regalPositionForm]
    );

    const handleKeyDown = React.useCallback(
        (e: React.KeyboardEvent<HTMLFormElement>) => {
            if (e.key === KeyCodes.enter) {
                handleSubmit(e);
            } else if (e.key === KeyCodes.escape && typeof onCancel === 'function') {
                onCancel();
            }
        },
        [onCancel, handleSubmit]
    );

    return (
        <form
            className={`${styles.regal_position_form_wrapper} ${className}`}
            onSubmit={handleSubmit}
            onKeyDown={handleKeyDown}
        >
            <div className={styles.regal_position_form_element}>
                <Input
                    required
                    placeholder="Position name..."
                    name="name"
                    id="name"
                    onChange={handleChange}
                    value={regalPositionForm.name}
                    autoFocus
                />
            </div>
            <div className={styles.buttons}>
                <Button
                    mode="primary"
                    disabled={regalPositionForm.name.length === 0}
                    className={styles.submit_button}
                >
                    Submit
                </Button>
                <Button mode="secondary" onClick={onCancel}>
                    Cancel
                </Button>
            </div>
        </form>
    );
};
