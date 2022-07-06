import { Button, Table } from "components";
import {
  TransportArticleForm,
  useAddTransportArticle,
  useDeleteTransportArticle,
  useGetTransportArticles,
} from "features/transport_articles";
import React from "react";
import { TransportArticleListItem } from "./TransportArticleListItem";
import styles from "./AddTransportArticleSection.module.css";

interface AddTransportArticleSectionProps {
  orderArticleId: number;
  articleId: number;
  articleName?: string;
  requestedQuantity: number;
  unit: string;
}

export const AddTransportArticleSection: React.FC<
  AddTransportArticleSectionProps
> = ({ orderArticleId, articleId, articleName, requestedQuantity, unit }) => {
  const {
    data,
    refetch,
    isLoading: isTransportArticlesLoading,
  } = useGetTransportArticles(orderArticleId);

  const {
    transportArticles = [],
    regals = [],
    warehouses = [],
    regalPositions = [],
  } = data ?? {};

  const mutateAdd = useAddTransportArticle(orderArticleId);
  const mutateRemove = useDeleteTransportArticle(orderArticleId);

  const isLoading = React.useMemo(() => {
    return (
      isTransportArticlesLoading ||
      mutateAdd.isLoading ||
      mutateRemove.isLoading
    );
  }, [isTransportArticlesLoading, mutateAdd, mutateRemove]);

  const [show, setShow] = React.useState(false);

  const handleShow = React.useCallback(() => {
    setShow(true);
  }, []);

  const handleClose = React.useCallback(() => {
    setShow(false);
  }, []);

  const handleSave = React.useCallback(
    (attributes: any) => {
      mutateAdd.mutate(attributes);
      handleClose();
    },
    [mutateAdd, handleClose]
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
    return transportArticles.reduce((prevQuantity, currentTransportArticle) => {
      const nextValue = currentTransportArticle.quantity || 0;
      return prevQuantity + nextValue;
    }, initialValue);
  }, [transportArticles]);

  return (
    <div className={styles.wrapper}>
      <Table
        isLoading={isLoading}
        headers={[
          "id",
          "Article",
          "Warehouse",
          "Regal",
          "Regal Position",
          `Quantity (${orderQuantity} of ${requestedQuantity} ${unit})`,
          "Remove",
        ]}
      >
        {transportArticles?.length
          ? transportArticles.map((transportArticle) => (
              <TransportArticleListItem
                key={transportArticle.id}
                transportArticle={transportArticle}
                articleName={articleName}
                warehouses={warehouses}
                regals={regals}
                regalPositions={regalPositions}
                onRemove={handleRemove}
              />
            ))
          : null}
      </Table>
      {show ? (
        <div className={styles.form_wrapper}>
          <TransportArticleForm
            onCancel={handleClose}
            transportArticle={{ articleId }}
            onSave={handleSave}
            className={styles.form}
          />
        </div>
      ) : (
        <Button onClick={handleShow}>Add Transport Article</Button>
      )}
    </div>
  );
};
