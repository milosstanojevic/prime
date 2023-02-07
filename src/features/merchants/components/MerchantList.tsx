import React from 'react';
import { MerchantListItem } from './MerchantListItem';
import { MerchantProvider } from '..';
import { Merchant } from '../types';
import { Table } from '../../../components';

type Props = {
    merchants?: Merchant[];
};

export const MerchantList: React.FC<Props> = ({ merchants }) => {
    return (
        <Table>
            {merchants?.map((merchant) => (
                <MerchantProvider key={merchant.id} merchant={merchant}>
                    <MerchantListItem />
                </MerchantProvider>
            ))}
        </Table>
    );
};
