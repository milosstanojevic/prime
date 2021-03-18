import React, { FC } from "react";

interface IMerchantPage {
  id: number;
}

export const MerchantPage: FC<IMerchantPage> = ({
  id,
}) => {
  return (
    <div>{id}</div>
  )
}
