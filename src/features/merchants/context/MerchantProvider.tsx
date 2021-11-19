import React from "react";
import { useSelector } from "react-redux";
import { makeGetMerchantById } from "../selectors";
import { Merchant } from "../types";

type MerchantContextType = {
  merchant: Merchant;
  updateMerchant: (id: number, attributes: Merchant) => void;
};

const MerchantContext = React.createContext<MerchantContextType | undefined>(
  undefined
);

export const useMerchantContext = () => {
  const ctx = React.useContext(MerchantContext);

  if (ctx === undefined) {
    throw new Error(
      `'useMerchantContext' must be used within a 'MerchantContextProvider'`
    );
  }

  return ctx;
};

interface IMerchantProvider {
  id: number;
  children: React.ReactNode;
}

export const MerchantProvider = ({ id, children }: IMerchantProvider) => {
  const getMerchantById = React.useMemo(() => makeGetMerchantById(id), [id]);
  const merchant = useSelector(getMerchantById);

  const updateMerchant = React.useCallback((id, attributes) => {
    console.log(id);
    console.log(attributes);
  }, []);

  return (
    <MerchantContext.Provider
      value={{
        merchant,
        updateMerchant,
      }}
    >
      {children}
    </MerchantContext.Provider>
  );
};
