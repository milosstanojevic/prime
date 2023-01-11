import { Button, Table } from 'components';
import {
    TransportArticleForm,
    useAddTransportArticle,
    useDeleteTransportArticle,
    useGetTransportArticles
} from 'features/transport_articles';
import React from 'react';
import { TransportArticleListItem } from './TransportArticleListItem';
import styles from './AddTransportArticleSection.module.css';

interface AddTransportArticleSectionProps {
    orderArticleId: number;
    articleId: number;
    articleName?: string;
    requestedQuantity: number;
    unit: string;
}

export const AddTransportArticleSection: React.FC<AddTransportArticleSectionProps> = ({
    orderArticleId,
    articleId,
    articleName,
    requestedQuantity,
    unit
}) => {
    const {
        data,
        refetch,
        isLoading: isTransportArticlesLoading
    } = useGetTransportArticles(orderArticleId);

    const mutateAdd = useAddTransportArticle(orderArticleId);
    const mutateRemove = useDeleteTransportArticle(orderArticleId);

    const isLoading = React.useMemo(() => {
        return isTransportArticlesLoading || mutateAdd.isLoading || mutateRemove.isLoading;
    }, [isTransportArticlesLoading, mutateAdd, mutateRemove]);

    const handleSave = React.useCallback(
        (attributes: any) => {
            return mutateAdd.mutateAsync({
                transport_order_article: orderArticleId,
                ...attributes
            });
        },
        [mutateAdd, orderArticleId]
    );

    const handleRemove = React.useCallback(
        async (id: number) => {
            await mutateRemove.mutateAsync(id);
            refetch();
        },
        [mutateRemove, refetch]
    );

    const orderQuantity = React.useMemo(() => {
        const initialValue = 0;
        return data?.reduce((prevQuantity, currentTransportArticle) => {
            const nextValue = currentTransportArticle.quantity || 0;
            return prevQuantity + nextValue;
        }, initialValue);
    }, [data]);

    return (
        <div className={styles.wrapper}>
            <Table
                isLoading={isLoading}
                headers={[
                    'id',
                    'Article',
                    'Warehouse',
                    'Regal',
                    'Regal Position',
                    `Quantity (${orderQuantity} of ${requestedQuantity} ${unit})`,
                    'Remove'
                ]}
            >
                {data?.length
                    ? data.map((transportArticle) => (
                          <TransportArticleListItem
                              key={transportArticle.id}
                              transportArticle={transportArticle}
                              articleName={articleName}
                              warehouse={transportArticle?.warehouse}
                              regal={transportArticle?.regal}
                              regalPosition={transportArticle?.regal_position}
                              onRemove={handleRemove}
                          />
                      ))
                    : null}
            </Table>
            <div className={styles.form_wrapper}>
                <TransportArticleForm
                    transportArticle={{ article: articleId }}
                    onSave={handleSave}
                    className={styles.form}
                    isSaving={mutateAdd.isLoading}
                    hideCancel
                />
            </div>
        </div>
    );
};
