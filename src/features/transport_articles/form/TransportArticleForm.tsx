import { Button, Loading } from "components";
import { useGetArticle } from "features/articles";
import React, { useState } from "react";
import { TransportArticle } from "../types";
import { TransportArticleOptionSelect } from "./TransportArticleOptionSelect";
import { TransportArticleQtyInput } from "./TransportArticleQtyInput";
import { decamelizeKeys } from "humps";

type Attributes = {
  article_id: number;
  warehouse_id: number;
  regal_id: number;
  regal_position_id: number;
  quantity: number;
};

type Props = {
  transportArticle?: TransportArticle;
  onSave?: (attributes: Attributes) => void;
  onCancel?: () => void;
  className?: string;
};

const initialState = {
  articleId: 0,
  warehouseId: 0,
  regalId: 0,
  regalPositionId: 0,
  quantity: 0,
};

export const TransportArticleForm: React.FC<Props> = ({
  transportArticle,
  onSave,
  onCancel,
  className,
}) => {
  const { data: article, isLoading } = useGetArticle(
    transportArticle?.articleId || 0
  );

  const [form, setForm] = useState(() => ({
    ...initialState,
    articleId: transportArticle?.articleId || 0,
  }));

  const handleWarehouseChange = React.useCallback((warehouseId: number) => {
    setForm((prevState) => ({
      ...prevState,
      warehouseId,
      regalId: 0,
      regalPositionId: 0,
      quantity: 0,
    }));
  }, []);

  const handleRegalChange = React.useCallback((regalId: number) => {
    setForm((prevState) => ({
      ...prevState,
      regalId,
      regalPositionId: 0,
      quantity: 0,
    }));
  }, []);

  const handleRegalPositionChange = React.useCallback(
    (regalPositionId: number) => {
      setForm((prevState) => ({ ...prevState, regalPositionId, quantity: 0 }));
    },
    []
  );

  const handleQtyChange = React.useCallback((quantity: number) => {
    setForm((prevState) => ({ ...prevState, quantity }));
  }, []);

  const show = React.useMemo(() => {
    return {
      warehouseSelect: form.articleId > 0,
      regalSelect: form.articleId > 0 && form.warehouseId > 0,
      regalPositionSelect:
        form.articleId > 0 && form.warehouseId > 0 && form.regalId > 0,
      qtyInput:
        form.articleId > 0 &&
        form.warehouseId > 0 &&
        form.regalId > 0 &&
        form.regalPositionId > 0,
      saveBtn:
        form.articleId > 0 &&
        form.warehouseId > 0 &&
        form.regalId > 0 &&
        form.regalPositionId > 0 &&
        form.quantity > 0,
    };
  }, [form]);

  const handleSave = React.useCallback(() => {
    const attributes = decamelizeKeys(form) as Attributes;
    onSave && onSave(attributes);
  }, [form, onSave]);

  const itemStyle: React.CSSProperties = {
    padding: "15px",
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className={className}>
      <div style={itemStyle}>{article?.name}</div>
      <div style={itemStyle}>
        {show.warehouseSelect ? (
          <TransportArticleOptionSelect
            articleId={form.articleId}
            onChange={handleWarehouseChange}
          />
        ) : (
          <span>Article not found</span>
        )}
      </div>
      <div style={itemStyle}>
        {show.regalSelect ? (
          <TransportArticleOptionSelect
            articleId={form.articleId}
            warehouseId={form.warehouseId}
            onChange={handleRegalChange}
          />
        ) : (
          <span>Select Warehouse</span>
        )}
      </div>
      <div style={itemStyle}>
        {show.regalPositionSelect ? (
          <TransportArticleOptionSelect
            articleId={form.articleId}
            warehouseId={form.warehouseId}
            regalId={form.regalId}
            onChange={handleRegalPositionChange}
          />
        ) : (
          <span>Select Regal</span>
        )}
      </div>
      <div style={itemStyle}>
        {show.qtyInput ? (
          <TransportArticleQtyInput
            articleId={form.articleId}
            warehouseId={form.warehouseId}
            regalId={form.regalId}
            regalPositionId={form.regalPositionId}
            onChange={handleQtyChange}
          />
        ) : (
          <span>Select Position</span>
        )}
      </div>
      <div style={{ ...itemStyle, textAlign: "center" }}>
        <Button disabled={!show.saveBtn} onClick={handleSave}>
          Save
        </Button>
        <Button
          mode="secondary"
          onClick={onCancel}
          style={{ marginLeft: "15px" }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};
