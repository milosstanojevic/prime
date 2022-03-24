import { Button, Select } from "components";
import { useGetArticles } from "features/articles";
import {
  useGetTransportOrders,
  useEditTransportOrder,
} from "features/transport_orders";
import { TransportOrder } from "features/transport_orders/types";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetTransportRoute } from "../api";
import { AddedTransportOrderListItem, OrderForTransport } from "./orders";
import styles from "./TransportAddOrdersPage.module.css";

export const TransportAddOrdersPage: React.FC = () => {
  const params = useParams();
  const id = Number(params.transportId);
  const [selectIds, setSelectIds] = React.useState([]);
  const { data: articles } = useGetArticles();
  const { data: allOrders, refetch } = useGetTransportOrders();
  const { data: transport } = useGetTransportRoute(id);
  const mutateEditOrder = useEditTransportOrder();
  const navigate = useNavigate();

  const pendingOrders = React.useMemo(() => {
    if (allOrders) {
      return allOrders
        .filter((order) => order.status === 2)
        .map((order) => ({ id: order.id || 0, name: `Order-${order.id}` }));
    }
    return [];
  }, [allOrders]);

  const takenOrders: TransportOrder[] = React.useMemo(() => {
    return allOrders && Array.isArray(allOrders)
      ? allOrders.filter(
          (order) => order.status === 3 && order.transportId === id
        )
      : [];
  }, [id, allOrders]);

  const singleSelect = React.useMemo(() => {
    if (selectIds.length) {
      const option = pendingOrders.find(({ id }) => id === selectIds[0]);
      return <Button>{option ? option.name : "Not found"}</Button>;
    }
    return <Button>Select Order...</Button>;
  }, [selectIds, pendingOrders]);

  const handleSelectChange = React.useCallback((ids) => {
    setSelectIds(ids);
  }, []);

  const handleBack = React.useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const updateOrder = React.useCallback(async () => {
    if (id && selectIds.length) {
      const attributes = {
        id: selectIds[0],
        status: 3,
        transport_id: id,
      };

      await mutateEditOrder.mutateAsync(attributes);
      setSelectIds([]);
      refetch();
    }
  }, [mutateEditOrder, selectIds, id]);

  const removeOrder = React.useCallback(
    async (orderId) => {
      if (orderId > 0) {
        const attributes = {
          id: orderId,
          status: 2,
          transport_id: null,
        };

        await mutateEditOrder.mutateAsync(attributes);
        refetch();
      }
    },
    [mutateEditOrder]
  );

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Button mode="link" onClick={handleBack}>
          Back
        </Button>
        <h3>{transport?.name}</h3>
      </div>
      {pendingOrders.length ? (
        <Select
          options={pendingOrders}
          target={singleSelect}
          onChange={handleSelectChange}
          selectedOptionIds={selectIds}
          defaultOption="Select None"
          closeOnAction
        />
      ) : (
        <div>No Pending Orders</div>
      )}

      <div style={{ margin: "10px" }}>
        <h4>Added Orders</h4>
        {takenOrders.map((order) => (
          <AddedTransportOrderListItem
            key={order.id}
            transportOrder={order}
            onRemoveOrder={removeOrder}
            transportId={id}
          />
        ))}
        {takenOrders.length === 0 ? <div>No Taken Orders</div> : null}
      </div>
      {selectIds.length && id ? (
        <>
          <Button onClick={updateOrder}>Take Order</Button>
          <OrderForTransport orderId={selectIds[0]} articles={articles} />
        </>
      ) : null}
    </div>
  );
};
