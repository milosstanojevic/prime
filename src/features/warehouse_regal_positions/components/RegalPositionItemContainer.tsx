import React, {memo, useMemo} from 'react'
import {RegalPositionItem} from "./RegalPositionItem";
import {makeGetRegalPositionById} from "../selectors";
import {useSelector} from "react-redux";
import {RootState} from "../../../app";

interface IRegalPositionItemContainer {
  id: number,
  warehouseId: number,
}

export const RegalPositionItemContainer = memo<IRegalPositionItemContainer>(({
  id,
  warehouseId,
}) => {
  const getRegal = useMemo(makeGetRegalPositionById, [])
  const regal = useSelector((state: RootState) => getRegal(state, id))

  return (
    <RegalPositionItem
      id={id}
      name={regal.name ? regal.name : 'Not found'}
      regalId={regal.regalId ? regal.regalId : 0}
      warehouseId={warehouseId}
    />
  )
})
