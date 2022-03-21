import { Button, Loading, Select } from "components";
import React from "react";
import { useGetTransportArticleOptions } from "../api";

type Props = {
  articleId: number;
  warehouseId?: number;
  regalId?: number;
  onChange?: (id: number) => void;
};

export const TransportArticleOptionSelect: React.FC<Props> = ({
  articleId,
  warehouseId,
  regalId,
  onChange,
}) => {
  const { data: options, isLoading } = useGetTransportArticleOptions({
    articleId,
    warehouseId,
    regalId,
  });

  const [selectIds, setSelectIds] = React.useState([]);

  const handleSelectChange = React.useCallback(
    (ids) => {
      setSelectIds(ids);
      onChange && onChange(ids[0]);
    },
    [onChange]
  );

  const label = React.useMemo(() => {
    if (articleId && !warehouseId && !regalId) {
      return "Warehouse";
    }
    if (articleId && warehouseId && !regalId) {
      return "Regal";
    }
    return "Regal Position";
  }, [articleId, warehouseId, regalId]);

  const singleSelect = React.useMemo(() => {
    if (selectIds.length) {
      const option = options?.find(({ id }) => id === selectIds[0]);
      return <Button>{option ? option.name : "Not found"}</Button>;
    }
    return <Button>Select {label}...</Button>;
  }, [selectIds, options, label]);

  return isLoading ? (
    <Loading />
  ) : (
    <Select
      searchPlaceholder={`Search ${label}...`}
      options={options || []}
      target={singleSelect}
      onChange={handleSelectChange}
      selectedOptionIds={selectIds}
      defaultOption="Select None"
      closeOnAction
    />
  );
};
