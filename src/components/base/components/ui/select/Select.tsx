import React, { FC, useCallback, useMemo, useState } from 'react';
import { SelectOption } from "./types";
import { Menu } from "../menu";
import { ElementWithRef } from "../menu/types";
import { SelectItem } from "./SelectItem";
import { Input } from "../input";
import styles from './Select.module.css'

interface ISelect {
  /** Select options */
  options: SelectOption[];
  /** Target element */
  target?: ElementWithRef<Element>;
  /** Selected option id */
  selectedOptionId?: number;
  /** On change */
  onChange?: (id: number) => void;
  /** Disable close select on action */
  disableCloseOnAction?: boolean;
  /** Is select open */
  open?: boolean;
  /** Search placeholder */
  searchPlaceholder?: string;
}

export const Select: FC<ISelect> = ({
  options,
  target,
  selectedOptionId,
  onChange,
  disableCloseOnAction = false,
  open: defaultOpen = false,
  searchPlaceholder = 'Search...',
}) => {
  const [open, setOpen] = useState(defaultOpen)
  const [search, setSearch] = useState('')

  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
    setSearch('')
  }, [])

  const handleChange = useCallback((id) => {
    typeof onChange === 'function' && onChange(id)
    if (!disableCloseOnAction) {
      handleClose()
    }
  }, [disableCloseOnAction, handleClose, onChange])

  const handleSearchChange = useCallback((e) => {
    const newSearch = e.target.value
    setSearch(newSearch)
  }, [])

  const filteredOptions = useMemo(() => {
    if (search.length > 1) {
      return options.filter(option => {
        return (
          option.name
            .toLowerCase()
            .indexOf(search.toLowerCase()) > -1
        );
      });
    }
    return options;
  }, [options, search])

  return (
    <Menu
      target={target}
      open={open}
      onClose={handleClose}
      onOpen={handleOpen}
    >
      <div className={styles.select_wrapper}>
        <div className={styles.select_search}>
          <Input
            autoFocus
            placeholder={searchPlaceholder}
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        <div className={styles.select_options}>
          {filteredOptions.map(option => (
            <SelectItem
              key={option.id}
              id={option.id}
              name={option.name}
              avatar={option.avatar}
              onClick={handleChange}
              selectedId={selectedOptionId}
            />
          ))}
        </div>
      </div>
    </Menu>
  )
};
