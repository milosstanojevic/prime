import React from 'react';
import { SelectMode, SelectOption } from './types';
import { Menu } from '../menu';
import { ElementWithRef } from '../menu/types';
import { SelectItem } from './SelectItem';
import { Input } from '../input';
import styles from './Select.module.css';

interface ISelect {
    /** Select options */
    options: SelectOption[];
    /** Target element */
    target?: ElementWithRef<Element>;
    /** Selected option id */
    selectedOptionIds?: Array<number | string>;
    /** On change */
    onChange?: (ids: Array<number | string>) => void;
    /** Disable close select on action */
    closeOnAction?: boolean;
    /** Is select open */
    open?: boolean;
    /** Search placeholder */
    searchPlaceholder?: string;
    /** Mode: single or multi */
    mode?: SelectMode;
    /** Default option name */
    defaultOption?: string;
    /** Disable search */
    disableSearch?: boolean;
}

export const Select: React.FC<ISelect> = ({
    options,
    target,
    selectedOptionIds = [],
    onChange,
    closeOnAction = false,
    open: defaultOpen = false,
    searchPlaceholder = 'Search...',
    mode = SelectMode.single,
    defaultOption = '',
    disableSearch = false
}) => {
    const [open, setOpen] = React.useState(defaultOpen);
    const [search, setSearch] = React.useState('');

    const handleOpen = React.useCallback(() => {
        setOpen(true);
    }, []);

    const handleClose = React.useCallback(() => {
        setOpen(false);
        setSearch('');
    }, []);

    const handleChange = React.useCallback(
        (newId: string | number) => {
            if (typeof onChange === 'function') {
                if (mode === SelectMode.multiple) {
                    const index = selectedOptionIds.findIndex((item) => item === newId);
                    const newSelectedIds =
                        index === -1
                            ? [...selectedOptionIds, newId]
                            : selectedOptionIds.filter((item) => item !== newId);
                    onChange(newSelectedIds);
                } else {
                    onChange([newId]);
                }
            }
            if (closeOnAction) {
                handleClose();
            }
        },
        [onChange, closeOnAction, mode, selectedOptionIds, handleClose]
    );

    const handleDefaultOptionChange = React.useCallback(() => {
        typeof onChange === 'function' && onChange([]);
        if (closeOnAction) {
            handleClose();
        }
    }, [onChange, closeOnAction, handleClose]);

    const handleSearchChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newSearch = e?.target?.value;
        setSearch(newSearch);
    }, []);

    const filteredOptions = React.useMemo(() => {
        if (search.length > 1) {
            return options.filter((option) => {
                return option.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
            });
        }
        return options;
    }, [options, search]);

    return (
        <Menu
            target={target}
            externalControls={[open, setOpen]}
            onClose={handleClose}
            onOpen={handleOpen}
        >
            <div className={styles.select_wrapper}>
                {!disableSearch ? (
                    <div className={styles.select_search}>
                        <Input
                            autoFocus
                            placeholder={searchPlaceholder}
                            value={search}
                            onChange={handleSearchChange}
                        />
                    </div>
                ) : null}
                <div className={styles.select_options}>
                    {defaultOption?.length ? (
                        <SelectItem
                            checked={selectedOptionIds?.length === 0}
                            id={0}
                            name={defaultOption}
                            onClick={handleDefaultOptionChange}
                        />
                    ) : null}
                    {filteredOptions.map((option, index) => (
                        <SelectItem
                            key={`${index}-${option.id}`}
                            id={option.id}
                            name={option.name}
                            avatar={option.avatar}
                            onClick={handleChange}
                            checked={selectedOptionIds.some(
                                (selectedId) => selectedId === option.id
                            )}
                        />
                    ))}
                </div>
            </div>
        </Menu>
    );
};
