import { Button } from "components";
import { TransportArticle } from "features/transport_articles/types";
import { Warehouse } from "features/warehouses/types";
import { Regal } from "features/warehouse_regals/types";
import { RegalPosition } from "features/warehouse_regal_positions/types";
import React from "react";
import styles from "./TransportArticleListItem.module.css";

interface TransportArticleListItemProps {
  transportArticle: TransportArticle;
  articleName?: string;
  warehouses: Warehouse[];
  regals: Regal[];
  regalPositions: RegalPosition[];
  onRemove?: (id: number) => void;
}

export const TransportArticleListItem: React.FC<
  TransportArticleListItemProps
> = ({
  transportArticle,
  articleName,
  onRemove,
  warehouses,
  regals,
  regalPositions,
}) => {
  const handleRemove = React.useCallback(() => {
    if (transportArticle?.id && onRemove) {
      onRemove(transportArticle.id);
    }
  }, [transportArticle, onRemove]);

  const props = React.useMemo(() => {
    const warehouse = warehouses.find(
      (item) => item.id === transportArticle.warehouseId
    );

    const regal = regals.find((item) => item.id === transportArticle.regalId);

    const regalPosition = regalPositions.find(
      (item) => item.id === transportArticle.regalPositionId
    );

    return {
      warehouseName: warehouse?.name || "-",
      regalName: regal?.name || "-",
      regalPositionName: regalPosition?.name || "-",
    };
  }, [transportArticle, warehouses, regalPositions, regals]);

  return (
    <tr>
      <td>#{transportArticle.id}</td>
      <td>{articleName}</td>
      <td>{props.warehouseName}</td>
      <td>{props.regalName}</td>
      <td>{props.regalPositionName}</td>
      <td>{transportArticle.quantity}</td>
      <td className={styles.btn}>
        <Button onClick={handleRemove}>X</Button>
      </td>
    </tr>
  );
};
