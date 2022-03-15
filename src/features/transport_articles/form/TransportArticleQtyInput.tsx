import { Input, Loading } from "components";
import { useGetWarehouseArticleByParams } from "features/warehouse_articles";
import React from "react";

interface TransportArticleQtyInputProps {
  articleId: number;
  warehouseId: number;
  regalId: number;
  regalPositionId: number;
}

export const TransportArticleQtyInput: React.FC<
  TransportArticleQtyInputProps
> = (params) => {
  const { data: warehouseArticle, isLoading } =
    useGetWarehouseArticleByParams(params);

  const [value, setValue] = React.useState(0);

  const handleChange = React.useCallback(
    (e) => {
      const newValue = Number(e.target.value);
      const maxQty = warehouseArticle?.quantity || 0;
      if (Number.isInteger(newValue) && newValue < maxQty && newValue > 0) {
        setValue(newValue);
      }
    },
    [warehouseArticle]
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Input onChange={handleChange} value={value} />
      {` < ${warehouseArticle?.quantity}`}
    </div>
  );
};
