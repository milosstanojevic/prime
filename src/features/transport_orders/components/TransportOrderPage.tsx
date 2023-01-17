import React, { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Bubble, Button, Loading, Modal } from '../../../components';
import {
    TransportOrderArticleForm,
    TransportOrderArticleItem,
    TransportOrderArticleProvider,
    useAddTransportOrderArticle,
    useGetTransportOrderArticles
} from '../../../features/transport_order_articles';
import { useGetArticles } from '../../../features/articles';
import styles from './TransportOrderPage.module.css';
import { useEditTransportOrder, useGetTransportOrder } from '../api';
import { TransportOrderArticle } from '../../../features/transport_order_articles/types';
import TransportOrderStatus from './transport_order_status';
import { useGetWarehouseArticles } from '../../../features/warehouse_articles';
import { Article } from '../../../features/articles/types';

export const TransportOrderPage: React.FC = () => {
    const params = useParams();
    const id = Number(params.id);
    const navigate = useNavigate();
    const [show, setShow] = React.useState(false);

    const { data: orderArticles, isLoading: isOrderArticlesLoading } =
        useGetTransportOrderArticles(id);
    const { data: articles, isLoading: isArticlesLoading } = useGetArticles();
    const { data: warehouseArticles, isLoading: isWarehouseArticlesLoading } =
        useGetWarehouseArticles();
    const {
        data: order,
        isLoading: isOrderLoading,
        refetch: refetchTransportOrder
    } = useGetTransportOrder(id);

    const mutateAdd = useAddTransportOrderArticle(id, (oldData, newData) => [...oldData, newData]);

    const [orderStatus, setOrderStatus] = React.useState(order?.status ? +order.status : 1);

    const mutateOrderEdit = useEditTransportOrder(undefined, { id });

    const preparedArticles = React.useMemo(() => {
        let items: Article[] = [];
        warehouseArticles?.forEach((warehouseArticle) => {
            const article = articles?.find((article) => article.id === warehouseArticle.article);
            article && items.push(article);
        });
        return items;
    }, [articles, warehouseArticles]);

    React.useEffect(() => {
        if (order) {
            setOrderStatus(order.status ? +order.status : 1);
        }
    }, [order]);

    React.useEffect(() => {
        if (mutateOrderEdit.isSuccess) {
            setOrderStatus(mutateOrderEdit.data?.data?.status);
        }
    }, [mutateOrderEdit]);

    const isLoading =
        isOrderArticlesLoading || isArticlesLoading || isOrderLoading || isWarehouseArticlesLoading;

    const fullOrderArticles = React.useMemo(() => {
        return orderArticles?.map((article) => {
            const fullArticle = articles?.find((item) => item.id === article.article) || {};
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
            if (id) {
                mutateAdd.mutate({ transport_order: +id, ...attributes });
                handleCloseModal();
            }
        },
        [mutateAdd, handleCloseModal, id]
    );

    const handleSetOrderStatus = useCallback(
        (orderStatus: string) => {
            const attributes = {
                id,
                status: orderStatus,
                parent: order?.parent,
                parent_id: order?.parent_id,
                transport_id: order?.transport || null
            };
            mutateOrderEdit.mutateAsync(attributes).then(() => refetchTransportOrder());
        },
        [id, mutateOrderEdit, order, refetchTransportOrder]
    );

    const isRemoveArticleDisabled = React.useMemo(() => {
        return orderStatus > 1;
    }, [orderStatus]);

    const isAddArticleDisabled = React.useMemo(() => {
        return orderStatus > 1;
    }, [orderStatus]);

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
                </div>
                <div className={styles.order_status}>
                    <TransportOrderStatus
                        orderStatus={order?.status}
                        onChange={handleSetOrderStatus}
                        options={
                            ['1', '2'].includes(order?.status || '')
                                ? [
                                      {
                                          id: '1',
                                          name: 'Pending'
                                      },
                                      {
                                          id: '2',
                                          name: 'Prepared'
                                      }
                                  ]
                                : [
                                      {
                                          id: '5',
                                          name: 'Arrived'
                                      },
                                      {
                                          id: '6',
                                          name: 'Completed'
                                      }
                                  ]
                        }
                    />
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
                        articles={preparedArticles || []}
                    />
                </Bubble>
            </Modal>
        </>
    );
};
