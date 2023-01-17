import React from 'react';
import { Loading, NavPills } from '../../../components';
import { Outlet, useParams } from 'react-router-dom';
import { useGetMerchant } from '..';
import styles from './MerchantPage.module.css';

export const MerchantPage: React.FC = () => {
    const params = useParams();
    const id = Number(params.id);

    const { data: merchant, isLoading } = useGetMerchant(id);

    const navs = React.useMemo(() => {
        return [
            {
                id: 1,
                name: 'Articles',
                link: `/merchants/${id}/articles`
            },
            {
                id: 2,
                name: 'Orders',
                link: `/merchants/${id}/orders`
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
