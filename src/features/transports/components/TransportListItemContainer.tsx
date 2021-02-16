import React, {useMemo, memo} from "react";
import {useSelector} from "react-redux";
import {makeGetTransportById} from "../selectors";
import {RootState} from "../../../app";
import {TransportListItem} from "./TransportListItem";

interface ITransportListItemContainer {
  id: number,
}

export const TransportListItemContainer = memo<ITransportListItemContainer> ( ({
  id,
}) => {
  const getTransport = useMemo(makeGetTransportById, [])
  const transport = useSelector((state: RootState) => getTransport(state, id))

  return (
    <TransportListItem
      id={id}
      name={transport.name}
    />
  )
})
