import React, {useEffect, useMemo, FC} from "react";
import styles from './TransportPage.module.css'
import {useDispatch, useSelector} from "react-redux";
import {makeGetTransportById} from "../selectors";
import {RootState} from "../../../app";
import {fetchTransport} from "../actions";

interface ITransportPage {
  id: number,
}

export const TransportPage: FC<ITransportPage> = ({
  id,
}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTransport(id))
  }, [dispatch, id])

  const getTransportById = useMemo(makeGetTransportById, [])
  const transport = useSelector((state: RootState) => getTransportById(state, id))

  return (
    <div className={styles.transport_wrapper}>
      <div>{transport.name}</div>
    </div>
  )
}
