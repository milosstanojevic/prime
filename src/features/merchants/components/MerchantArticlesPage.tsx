import React from "react";

interface MerchantArticlesPageProps {
  id: number;
}

export const MerchantArticlesPage: React.FC<MerchantArticlesPageProps> = ({
  id,
}) => {
  return <div>Article for merchant with id: {id}</div>;
};
