import React from "react";
import styles from "./TransportPage.module.css";
import { useParams } from "react-router-dom";
import { useGetTransportRoute } from "..";

export const TransportPage: React.FC = () => {
  const params = useParams();
  const id = Number(params.transportId);

  const { data: transport } = useGetTransportRoute(id);

  return (
    <div className={styles.transport_wrapper}>
      <div>{transport?.name}</div>
    </div>
  );
};
