import React from "react";
import styles from "./TransportPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { makeGetTransportById } from "../selectors";
import { fetchTransport } from "../actions";
import { useParams } from "react-router-dom";

export const TransportPage: React.FC = () => {
  const params = useParams();
  const id = Number(params.transportId);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchTransport(id));
  }, [dispatch, id]);

  const getTransportById = React.useMemo(() => makeGetTransportById(id), [id]);
  const transport = useSelector(getTransportById);

  return (
    <div className={styles.transport_wrapper}>
      <div>{transport.name}</div>
    </div>
  );
};
