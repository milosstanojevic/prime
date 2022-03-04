import React from "react";
import styles from "./MerchantList.module.css";
import { MerchantListItem } from "./MerchantListItem";
import { MerchantProvider } from "..";
import { Merchant } from "../types";

type Props = {
  merchants?: Merchant[];
};

export const MerchantList: React.FC<Props> = ({ merchants }) => {
  return (
    <div className={styles.warehouse_list}>
      {merchants?.map((merchant) => (
        <MerchantProvider key={merchant.id} merchant={merchant}>
          <MerchantListItem />
        </MerchantProvider>
      ))}
    </div>
  );
};
