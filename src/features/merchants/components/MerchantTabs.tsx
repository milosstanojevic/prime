import * as React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { Loading, NavPills } from '../../../components';
import { useGetMerchant } from '../api';
import styles from './MerchantPage.module.css';

interface MerchantTabsProps {}

const MerchantTabs: React.FC<MerchantTabsProps> = () => {
    const params = useParams();
    const id = Number(params.id);

    const { data: merchant, isLoading } = useGetMerchant(id);

    const navs = React.useMemo(() => {
        return [
            {
                id: 1,
                name: 'Articles',
                link: `/merchant/${id}/articles`
            },
            {
                id: 2,
                name: 'Orders',
                link: `/merchant/${id}/orders`
            }
        ];
    }, [id]);

    return isLoading ? (
        <Loading />
    ) : (
        <>
            <div className={styles.wrapper}>
                <div>{merchant?.name}</div>
                <NavPills navs={navs} />
            </div>
            <Outlet />
        </>
    );
};

export default MerchantTabs;
