import { useTransportOrderContext } from "features/transport_orders";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./MerchantOrderListItem.module.css";

interface MerchantOrderListItemProps {}

export const MerchantOrderListItem: React.FC<MerchantOrderListItemProps> = () => {
  const { transportOrder } = useTransportOrderContext();
  const { id } = transportOrder;
  return (
    <div>
      <div className={styles.item}>
        <div className={styles.item_element}>{id}</div>
        <div className={styles.item_element}>
          <Link to={{ pathname: `/orders/${id}` }}>{`Order-${id}`}</Link>
        </div>
      </div>
    </div>
  );
};
