import { AppDispatch } from "app";
import { Button, Loading } from "components";
import {
  addTransportOrder,
  fetchParentTransportOrders,
  NormalizerTransportOrderRequest,
} from "features/transport_orders";
import React from "react";
import { useDispatch } from "react-redux";
import { MerchantsOrderList } from "./MerchantOrdersList";
import { useNavigate, useParams } from "react-router-dom";

export const MerchantOrdersPage: React.FC = () => {
  const params = useParams();
  const id = Number(params.id);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isLoading, setLoading] = React.useState(true);
  const [isCreating, setIsCreating] = React.useState(false);
  React.useEffect(() => {
    dispatch(fetchParentTransportOrders({ id, parent: "merchant" })).finally(
      () => setLoading(false)
    );
  }, [dispatch, id]);

  const handleCreateOrder = React.useCallback(() => {
    setIsCreating(true);
    dispatch(addTransportOrder({ parent: "merchant", parentId: id }))
      .then((response) => {
        const { payload = {} } = response;
        const { result = 0 } = payload as NormalizerTransportOrderRequest;
        if (result > 0) {
          navigate(`/orders/${result}`);
        }
      })
      .finally(() => setIsCreating(false));
  }, [id, dispatch, navigate]);

  return (
    <div>
      <Button onClick={handleCreateOrder} disabled={isCreating}>
        Create Order
      </Button>
      {isLoading ? <Loading /> : <MerchantsOrderList id={id} />}
    </div>
  );
};
