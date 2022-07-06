import React from 'react';
import { useEditMerchant } from '..';
import { Merchant } from '../types';

type MerchantContextType = {
    merchant: Merchant;
    updateMerchant: (attributes: Merchant) => void;
};

const MerchantContext = React.createContext<MerchantContextType | undefined>(undefined);

export const useMerchantContext = () => {
    const ctx = React.useContext(MerchantContext);

    if (ctx === undefined) {
        throw new Error(`'useMerchantContext' must be used within a 'MerchantContextProvider'`);
    }

    return ctx;
};

interface IMerchantProvider {
    merchant: Merchant;
    children: React.ReactNode;
}

export const MerchantProvider = ({ merchant, children }: IMerchantProvider) => {
    const mutateEdit = useEditMerchant((oldWarehouses, newWarehouse) => {
        return oldWarehouses?.map((warehouse) =>
            warehouse.id === newWarehouse.id ? { ...warehouse, ...newWarehouse } : warehouse
        );
    });

    const updateMerchant = React.useCallback(
        (attributes: Merchant) => {
            mutateEdit.mutate(attributes);
        },
        [mutateEdit]
    );

    return (
        <MerchantContext.Provider
            value={{
                merchant,
                updateMerchant
            }}
        >
            {children}
        </MerchantContext.Provider>
    );
};
