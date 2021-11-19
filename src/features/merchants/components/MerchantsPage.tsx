import React from "react";
import { useDispatch } from "react-redux";
import styles from "./MerchantsPage.module.css";
import { Button, Modal, Loading } from "../../../components";
import { fetchMerchants, clearMerchants, addMerchant } from "../actions";
import { MerchantList } from "./MerchantList";
import { AppDispatch } from "app";
import { MerchantForm } from "../form";

export const MerchantsPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [showMerchantCreate, setShowMerchantCreate] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    dispatch(fetchMerchants()).finally(() => setIsLoading(false));
    return () => {
      dispatch(clearMerchants());
    };
  }, [dispatch]);

  const handleShowCreateMerchantModal = React.useCallback(() => {
    setShowMerchantCreate(true);
  }, []);

  const handleCloseCreateMerchantModal = React.useCallback(() => {
    setShowMerchantCreate(false);
  }, []);

  const onMerchantCreate = React.useCallback(
    (attributes) => {
      dispatch(addMerchant(attributes));
    },
    [dispatch]
  );

  return (
    <div className={styles.page}>
      <div className={styles.page_header}>
        <Button mode="primary" onClick={handleShowCreateMerchantModal}>
          Create new Merchant
        </Button>
      </div>
      {isLoading ? <Loading /> : <MerchantList />}
      <Modal open={showMerchantCreate} onClose={handleCloseCreateMerchantModal}>
        <div className={styles.modal_form_wrapper}>
          <MerchantForm
            onCancel={handleCloseCreateMerchantModal}
            onSubmit={onMerchantCreate}
          />
        </div>
      </Modal>
    </div>
  );
};
