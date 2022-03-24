import { Button } from "components";
import { useGetArticles } from "features/articles";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { OrderForTransport } from "./OrderForTransport";

export const TransportOrderItemPage: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const orderId = Number(params.orderId);
  const { data: articles } = useGetArticles();

  const handleBack = React.useCallback(() => {
    navigate(-1);
  }, [navigate]);
  return (
    <>
      <Button mode="link" onClick={handleBack}>
        Back
      </Button>
      <OrderForTransport orderId={orderId} articles={articles} />
    </>
  );
};
