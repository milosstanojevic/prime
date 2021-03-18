import React, { FC } from 'react'
import { RootState } from 'app/rootReducer';
import { useSelector } from 'react-redux';
import styles from './MerchantList.module.css'
import { MerchantListItem } from "./MerchantListItem";
import { Loading } from "../../../components";

interface IMerchantList {
  onEdit?: (id: number) => void,
  onTrash?: (id: number) => void,
}

export const MerchantList: FC<IMerchantList> = ({
  onEdit,
  onTrash,
}) => {
  const merchants = useSelector(
    (state: RootState) => state.merchants.items
  );

  const isLoading = useSelector(
    (state: RootState) => state.merchants.isLoading
  );

  return !isLoading ? (
    <div className={styles.warehouse_list}>
      {merchants.map(merchant => (
        <MerchantListItem
          key={merchant.id}
          id={merchant.id}
          name={merchant.name}
          description={merchant.description}
          address={merchant.address}
          onEdit={onEdit}
          onTrash={onTrash}
        />
      ))}
    </div>
  ): (
    <Loading/>
  )
}
