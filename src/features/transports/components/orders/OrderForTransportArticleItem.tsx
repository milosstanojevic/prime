import { TransportOrderArticle } from 'features/transport_order_articles/types';
import React from 'react';
import { AddTransportArticleSection } from './AddTransportArticleSection';
import styles from './OrderForTransportArticleItem.module.css';

interface OrderForTransportArticleItemProps {
    orderArticle: TransportOrderArticle;
}

const OrderForTransportArticleItem: React.FC<OrderForTransportArticleItemProps> = ({
    orderArticle
}) => {
    const [open, setOpen] = React.useState(false);
    const expandArticles = React.useCallback(() => {
        setOpen((prev) => !prev);
    }, []);
    return (
        <>
            <div className={styles.article_list} onClick={expandArticles}>
                <div className={styles.article_item}>{orderArticle.name}</div>
                <div className={styles.article_item}>
                    Requested: {orderArticle.requested_quantity} {orderArticle.unit}
                </div>
                <div className={styles.article_item}>
                    Transport: {orderArticle.transport_quantity || 0} {orderArticle.unit}
                </div>
                <div className={styles.article_item}>{'+'}</div>
            </div>
            {open && orderArticle.id && orderArticle.article ? (
                <AddTransportArticleSection
                    orderArticleId={orderArticle.id}
                    articleId={orderArticle.article}
                    articleName={orderArticle.name}
                    requestedQuantity={orderArticle?.requested_quantity || 0}
                    unit={orderArticle.unit || 'Kg'}
                />
            ) : null}
        </>
    );
};

export default OrderForTransportArticleItem;
