import { Button } from "components";
import { getTransportOrderStatusLabel } from "features/transport_orders";
import { TransportOrder } from "features/transport_orders/types";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./AddedTransportOrderListItem.module.css";

type Props = {
  onRemoveOrder: (orderId: number) => void;
  onAvailableForTransport: (orderId: number, status: number) => void;
  transportOrder: TransportOrder;
  transportId: number;
};

export const AddedTransportOrderListItem: React.FC<Props> = ({
  onRemoveOrder,
  transportOrder,
  onAvailableForTransport,
  transportId,
}) => {
  const handleRemoveOrder = React.useCallback(() => {
    transportOrder.id && onRemoveOrder(transportOrder.id);
  }, [transportOrder, onRemoveOrder]);

  const handleAvailableForTransport = React.useCallback(() => {
    const status = transportOrder.status === 3 ? 4 : 3;
    transportOrder.id && onAvailableForTransport(transportOrder.id, status);
  }, [transportOrder, onAvailableForTransport]);

  return (
    <div className={styles.page}>
      <div className={styles.item}>
        <Link
          to={`/transport-routes/${transportId}/orders/${transportOrder.id}`}
        >
          Order - {transportOrder.id}
        </Link>
      </div>
      <div className={styles.item}>
        {getTransportOrderStatusLabel(transportOrder.status)}
      </div>
      <div className={styles.item}>
        <Button onClick={handleAvailableForTransport}>
          {transportOrder.status === 3
            ? "Available for Transport"
            : "Return to Taken"}
        </Button>
      </div>
      <div className={styles.item}>
        <Button onClick={handleRemoveOrder}>Remove Order</Button>
      </div>
    </div>
  );
};
