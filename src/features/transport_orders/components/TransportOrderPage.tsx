import React, { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Bubble, Button, Loading, Modal } from 'components';
import {
    TransportOrderArticleForm,
    TransportOrderArticleItem,
    TransportOrderArticleProvider,
    useAddTransportOrderArticle,
    useGetTransportOrderArticles
} from 'features/transport_order_articles';
import { useGetArticles } from 'features/articles';
import styles from './TransportOrderPage.module.css';
import { useEditTransportOrder, useGetTransportOrder } from '../api';
import { getTransportOrderStatusLabel } from '../utils';
import { TransportOrderArticle } from 'features/transport_order_articles/types';

export const TransportOrderPage: React.FC = () => {
    const params = useParams();
    const id = Number(params.id);
    const navigate = useNavigate();
    const [show, setShow] = React.useState(false);

    const { data: orderArticles, isLoading: isOrderArticlesLoading } =
        useGetTransportOrderArticles(id);
    const { data: articles, isLoading: isArticlesLoading } = useGetArticles();
    const { data: order, isLoading: isOrderLoading } = useGetTransportOrder(id);

    const mutateAdd = useAddTransportOrderArticle(id, (oldData, newData) => [...oldData, newData]);

    const [orderStatus, setOrderStatus] = React.useState(order?.status || 1);

    const mutateOrderEdit = useEditTransportOrder(undefined, { id });

    React.useEffect(() => {
        if (order) {
            setOrderStatus(order.status || 1);
        }
    }, [order]);

    React.useEffect(() => {
        if (mutateOrderEdit.isSuccess) {
            setOrderStatus(mutateOrderEdit.data?.data?.status);
        }
    }, [mutateOrderEdit]);

    const isLoading = isOrderArticlesLoading || isArticlesLoading || isOrderLoading;

    const fullOrderArticles = React.useMemo(() => {
        return orderArticles?.map((article) => {
            const fullArticle = articles?.find((item) => item.id === article.articleId) || {};
            return { ...fullArticle, ...article };
        });
    }, [articles, orderArticles]);

    const handleCloseModal = React.useCallback(() => {
        setShow(false);
    }, []);

    const handleOpenModal = React.useCallback(() => {
        setShow(true);
    }, []);

    const handleSubmit = React.useCallback(
        (attributes: TransportOrderArticle) => {
            mutateAdd.mutate(attributes);
            handleCloseModal();
        },
        [mutateAdd, handleCloseModal]
    );

    const handleSetOrderStatus = useCallback(() => {
        const attributes = {
            id,
            status: orderStatus === 1 ? 2 : 1,
            transport_id: null
        };
        mutateOrderEdit.mutate(attributes);
    }, [id, mutateOrderEdit, orderStatus]);

    const isRemoveArticleDisabled = React.useMemo(() => {
        return orderStatus > 1;
    }, [orderStatus]);

    const isAddArticleDisabled = React.useMemo(() => {
        return orderStatus > 1;
    }, [orderStatus]);

    const isSetStatusDisabled = React.useMemo(() => {
        return orderStatus > 2 || fullOrderArticles?.length === 0;
    }, [orderStatus, fullOrderArticles]);

    return isLoading ? (
        <Loading />
    ) : (
        <>
            <div className={styles.header_wrapper}>
                <div className={styles.header_list}>
                    <div className={styles.header_item}>
                        <Button mode="link" onClick={() => navigate(-1)}>
                            Back
                        </Button>
                    </div>
                    <div className={styles.header_item}>Order - {id}</div>
                    <div className={styles.header_item}>
                        <Button onClick={handleSetOrderStatus} disabled={isSetStatusDisabled}>
                            Set Order As {orderStatus === 1 ? 'Prepared' : 'Pending'}
                        </Button>
                    </div>
                </div>
                <div className={styles.order_status}>
                    {getTransportOrderStatusLabel(orderStatus)}
                </div>
            </div>
            <Button onClick={handleOpenModal} disabled={isAddArticleDisabled}>
                Add Article
            </Button>
            {fullOrderArticles?.map((orderArticle) => {
                return (
                    <TransportOrderArticleProvider
                        transportOrder={order}
                        key={`${id}-${orderArticle.id}`}
                        orderArticle={orderArticle}
                        isRemoveArticleDisabled={isRemoveArticleDisabled}
                    >
                        <TransportOrderArticleItem />
                    </TransportOrderArticleProvider>
                );
            })}
            <Modal open={show} onClose={handleCloseModal}>
                <Bubble className={styles.modal_form_wrapper}>
                    <div>Add Article to Order</div>
                    <TransportOrderArticleForm
                        onCancel={handleCloseModal}
                        onSubmit={handleSubmit}
                        articles={articles || []}
                    />
                </Bubble>
            </Modal>
        </>
    );
};
