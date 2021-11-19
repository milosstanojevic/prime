import React from "react";
import { useSelector } from "react-redux";
import styles from "./MerchantList.module.css";
import { MerchantListItem } from "./MerchantListItem";
import { getMerchantIds } from "../selectors";
import { MerchantProvider } from "..";

export const MerchantList = () => {
  const merchants = useSelector(getMerchantIds);

  return (
    <div className={styles.warehouse_list}>
      {merchants.map((id) => (
        <MerchantProvider key={id} id={id}>
          <MerchantListItem />
        </MerchantProvider>
      ))}
    </div>
  );
};
