import React from "react";
import { AppDispatch } from "app";
import { Loading, NavPills } from "components";
import { useDispatch, useSelector } from "react-redux";
import { fetchMerchant } from "..";
import { makeGetMerchantById } from "../selectors";
import { useParams } from "react-router-dom";

export const MerchantPage: React.FC = () => {
  const params = useParams();
  const id = Number(params.id);
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setLoading] = React.useState(true);
  const getMerchant = React.useMemo(() => makeGetMerchantById(id), [id]);
  const merchant = useSelector(getMerchant);

  React.useEffect(() => {
    dispatch(fetchMerchant(id)).finally(() => setLoading(false));
  }, [dispatch, id]);

  const navs = React.useMemo(() => {
    return [
      {
        id: 1,
        name: "Articles",
        link: `/merchants/${id}/articles`,
      },
      {
        id: 2,
        name: "Orders",
        link: `/merchants/${id}/orders`,
      },
    ];
  }, [id]);

  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <div>{merchant.name}</div>
      <NavPills navs={navs} />
    </div>
  );
};
