import React, {FC, useCallback} from 'react';
import {SelectOption} from "./types";
import {Radio} from "../input";
import styles from './SelectItem.module.css'

interface ISelectItem extends SelectOption {
  onClick?: (id: number|string) => void,
  selectedId?: number|string,
}

export const SelectItem: FC<ISelectItem> = ({
  id,
  name,
  avatar,
  onClick,
  selectedId,
}) => {
  const handleClick = useCallback(() => {
    typeof onClick === 'function' && onClick(id)
  }, [id, onClick])
  return (
    <div className={styles.select_item_wrapper} onClick={handleClick}>
      {avatar ? (
        <div>{avatar}</div>
      ): null}
      <div>{name}</div>
      <Radio defaultChecked={id === selectedId}/>
    </div>
  )
};
