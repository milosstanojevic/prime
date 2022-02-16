import React from "react";
import { useParams } from "react-router-dom";

export const MerchantArticlesPage: React.FC = () => {
  const params = useParams();
  const id = Number(params.id);
  return <div>Article for merchant with id: {id}</div>;
};
