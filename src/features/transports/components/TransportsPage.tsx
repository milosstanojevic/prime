import React, { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllTransportIds} from "../selectors";
import {RootState} from "../../../app";
import {clearTransports, fetchTransports} from "../actions";
import TransportFormContainer from "./TransportFormContainer";
import {TransportListItemContainer} from "./TransportListItemContainer";
import styles from './TransportsPage.module.css'

export const TransportsPage = () => {
  const dispatch = useDispatch()
  const transportIds = useSelector((state: RootState) => getAllTransportIds(state))

  useEffect(() => {
    dispatch(fetchTransports())
    return () => {
      dispatch(clearTransports())
    }
  }, [dispatch])

  return (
    <div className={styles.page}>
      <TransportFormContainer/>
      <div className={styles.transport_list}>
        {transportIds.map(id => {
          return (
            <TransportListItemContainer
              key={id}
              id={id}
            />
          )
        })}
      </div>
    </div>
  )
}
