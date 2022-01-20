import React from "react";
import { useSelector } from "react-redux";
import {
  makeGetParentTransportOrders,
  TransportOrderProvider,
} from "../../transport_orders";
import { MerchantOrderListItem } from "./MerchantOrderListItem";

interface MerchantsOrderListProps {
  id: number;
}

export const MerchantsOrderList: React.FC<MerchantsOrderListProps> = ({
  id,
}) => {
  const getMerchantTransportOrders = React.useMemo(
    () => makeGetParentTransportOrders("merchant", id),
    [id]
  );

  const merchantOrders = useSelector(getMerchantTransportOrders);
  return (
    <div>
      {merchantOrders.map((merchantOrder) => {
        return merchantOrder?.id ? (
          <TransportOrderProvider id={merchantOrder.id} key={merchantOrder.id}>
            <MerchantOrderListItem />
          </TransportOrderProvider>
        ) : null;
      })}
    </div>
  );
};
