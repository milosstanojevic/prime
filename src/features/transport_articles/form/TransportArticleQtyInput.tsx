import { Input, Loading } from "components";
import { useGetWarehouseArticleByParams } from "features/warehouse_articles";
import React from "react";

interface TransportArticleQtyInputProps {
  articleId: number;
  warehouseId: number;
  regalId: number;
  regalPositionId: number;
  onChange: (value: number) => void;
}

export const TransportArticleQtyInput: React.FC<
  TransportArticleQtyInputProps
> = (params) => {
  const { data: warehouseArticle, isLoading } =
    useGetWarehouseArticleByParams(params);

  const [value, setValue] = React.useState(0);

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(e.target.value);
      const maxQty = warehouseArticle?.quantity || 0;
      if (Number.isInteger(newValue) && newValue < maxQty && newValue > 0) {
        setValue(newValue);
        params.onChange && params.onChange(newValue);
      }
    },
    [warehouseArticle, params]
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Input onChange={handleChange} value={value} />
      <div
        style={{ minWidth: "80px", marginLeft: "15px" }}
      >{` < ${warehouseArticle?.quantity}`}</div>
    </div>
  );
};
