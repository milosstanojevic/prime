import React from "react";
import styles from "./SidePicker.module.css";
import { Select, SelectOption } from "../select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

interface ISidePicker {
  /** Select options */
  options: SelectOption[];
  /** Selected Id */
  selectedId?: number | string;
  /** Classname */
  className?: string;
  /** On change */
  onChange?: (id: number | string) => void;
  /** Default target placeholder */
  defaultTargetPlaceholder?: string;
}

export const SidePicker: React.FC<ISidePicker> = ({
  options = [],
  selectedId: defaultId = 0,
  className,
  onChange,
  defaultTargetPlaceholder = "Choose",
}) => {
  const [selectedId, setSelectedId] = React.useState(defaultId);

  const handleLeftClick = React.useCallback(() => {
    const item = options.find((option) => option.id === selectedId);
    if (item) {
      const currentIndex = options.indexOf(item);
      const nextIndex = currentIndex - 1;
      const nextItem =
        nextIndex > -1 ? options[nextIndex] : options[options.length - 1];

      setSelectedId(nextItem.id);
      typeof onChange === "function" && onChange(nextItem.id);
    }
  }, [selectedId, options, onChange]);

  const handleRightClick = React.useCallback(() => {
    const item = options.find((option) => option.id === selectedId);
    if (item) {
      const currentIndex = options.indexOf(item);
      const nextIndex = currentIndex + 1;
      const nextItem =
        nextIndex < options.length ? options[nextIndex] : options[0];

      setSelectedId(nextItem.id);
      typeof onChange === "function" && onChange(nextItem.id);
    }
  }, [selectedId, options, onChange]);

  const handleChoose = React.useCallback(
    (ids) => {
      setSelectedId(ids[0]);
      typeof onChange === "function" && onChange(ids[0]);
    },
    [setSelectedId, onChange]
  );

  const target = React.useMemo(() => {
    if (selectedId > 0) {
      const option = options.find(({ id }) => id === selectedId);
      return (
        <button className={styles.side_picker_dropdown_target}>
          {option ? option.name : "Not found"}
        </button>
      );
    }
    return (
      <button className={styles.side_picker_dropdown_target}>
        {defaultTargetPlaceholder}
      </button>
    );
  }, [defaultTargetPlaceholder, options, selectedId]);

  return (
    <div className={`${styles.side_picker_wrapper} ${className}`}>
      <button
        type="button"
        onClick={handleLeftClick}
        className={`${styles.icon_wrapper} ${styles.rounded_left}`}
      >
        <FontAwesomeIcon icon={faAngleLeft} className={styles.icon} />
      </button>
      <div className={styles.side_picker_dropdown}>
        <Select
          target={target}
          options={options}
          onChange={handleChoose}
          selectedOptionIds={[selectedId]}
          disableSearch={options.length < 4}
        />
      </div>
      <button
        type="button"
        className={`${styles.icon_wrapper} ${styles.rounded_right}`}
        onClick={handleRightClick}
      >
        <FontAwesomeIcon icon={faAngleRight} className={styles.icon} />
      </button>
    </div>
  );
};
