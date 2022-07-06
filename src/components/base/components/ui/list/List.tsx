import React from "react";
import styles from "./List.module.css";

type Props = {
  children: React.ReactNode;
  className?: string;
  isColumn?: boolean;
  evenly?: boolean;
};

export const List: React.FC<Props> = ({
  children,
  isColumn = false,
  evenly = false,
  className = "",
}) => {
  const classNames = React.useMemo(() => {
    let additional = `${styles.list_row}`;

    if (isColumn) {
      additional = `${styles.list_column}`;
    }

    if (evenly) {
      additional = `${additional} ${styles.evenly}`;
    }

    return `${styles.list_wrapper} ${additional} ${className}`;
  }, [isColumn, className, evenly]);

  return <div className={classNames}>{children}</div>;
};
