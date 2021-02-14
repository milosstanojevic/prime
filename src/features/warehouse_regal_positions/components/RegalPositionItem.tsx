import React, {useMemo, FC} from "react";
import {RootState} from "../../../app";
import styles from './RegalPositionItem.module.css'
import {useSelector} from "react-redux";
import {
  makeGetArticlesByWarehouseRegalPositionId,
  WarehouseArticleForm,
  WarehouseArticleItem
} from "../../warehouse_articles";

interface IRegalPositionItem {
  id: number,
  name: string,
  regalId: number,
  warehouseId: number,
}

export const RegalPositionItem: FC<IRegalPositionItem> = ({
  id,
  name,
  regalId,
  warehouseId,
}) => {
  const getRegalPositionArticles = useMemo(makeGetArticlesByWarehouseRegalPositionId, [])
  const regalPositionArticles = useSelector(
    (state: RootState) => getRegalPositionArticles(state, { warehouseId, regalId, regalPositionId: id })
  )

  return (
    <div className={styles.wrapper}>
      <div className={styles.name}>{name}</div>
      <div className={styles.wrapper_content}>
        <WarehouseArticleForm
          regalPositionId={id}
          regalId={regalId}
          warehouseId={warehouseId}
        />
        <div className={styles.item}>
          {regalPositionArticles.map(({ id, name, quantity, unit }) => {
            if (id && id > 0) {
              return (
                <WarehouseArticleItem
                  key={id}
                  id={id}
                  name={name}
                  quantity={quantity}
                  unit={unit}
                />
              )
            }
            return null
          })}
        </div>
      </div>
    </div>
  )
}
