import { Button, Select } from "components";
import { useGetArticles } from "features/articles";
import { useGetTransportOrders } from "features/transport_orders";
import React from "react";
import { useParams } from "react-router-dom";
import { OrderForTransport } from "./orders";
import styles from "./TransportAddOrdersPage.module.css";

export const TransportAddOrdersPage: React.FC = () => {
  const params = useParams();
  const id = Number(params.transportId);
  const [selectIds, setSelectIds] = React.useState([]);
  const { data: articles } = useGetArticles();
  const { data: allOrders } = useGetTransportOrders();

  const orders = React.useMemo(() => {
    if (allOrders) {
      return allOrders
        .filter((order) => order.status === 2)
        .map((order) => ({ id: order.id || 0, name: `Order-${order.id}` }));
    }
    return [];
  }, [allOrders]);

  const singleSelect = React.useMemo(() => {
    if (selectIds.length) {
      const option = orders.find(({ id }) => id === selectIds[0]);
      return <Button>{option ? option.name : "Not found"}</Button>;
    }
    return <Button>Select Order...</Button>;
  }, [selectIds, orders]);

  const handleSelectChange = React.useCallback((ids) => {
    setSelectIds(ids);
  }, []);

  return (
    <div className={styles.page}>
      <div>{id}</div>
      <Select
        options={orders}
        target={singleSelect}
        onChange={handleSelectChange}
        selectedOptionIds={selectIds}
        defaultOption="Select None"
        closeOnAction
      />
      <div>
        <h3>Added Orders</h3>
        Todo list of added orders with a link
      </div>
      {selectIds.length ? (
        <OrderForTransport orderId={selectIds[0]} articles={articles} />
      ) : null}
    </div>
  );
};
