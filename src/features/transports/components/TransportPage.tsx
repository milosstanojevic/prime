import React from "react";
import styles from "./TransportPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { makeGetTransportById } from "../selectors";
import { fetchTransport } from "../actions";

interface ITransportPage {
  id: number;
}

export const TransportPage: React.FC<ITransportPage> = ({ id }) => {
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
