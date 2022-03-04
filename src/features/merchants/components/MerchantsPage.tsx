import React from "react";
import styles from "./MerchantsPage.module.css";
import { Button, Modal, Loading } from "../../../components";
import { MerchantList } from "./MerchantList";
import { MerchantForm } from "../form";
import { useAddMerchant, useGetMerchants } from "..";

export const MerchantsPage = () => {
  const [showMerchantCreate, setShowMerchantCreate] = React.useState(false);
  const { data: merchants, isLoading } = useGetMerchants();
  const mutateAdd = useAddMerchant((oldData, newData) => [...oldData, newData]);

  const handleShowCreateMerchantModal = React.useCallback(() => {
    setShowMerchantCreate(true);
  }, []);

  const handleCloseCreateMerchantModal = React.useCallback(() => {
    setShowMerchantCreate(false);
  }, []);

  const onMerchantCreate = React.useCallback(
    (attributes) => {
      mutateAdd.mutate(attributes);
      handleCloseCreateMerchantModal();
    },
    [handleCloseCreateMerchantModal, mutateAdd]
  );

  return (
    <div className={styles.page}>
      <div className={styles.page_header}>
        <Button mode="primary" onClick={handleShowCreateMerchantModal}>
          Create new Merchant
        </Button>
      </div>
      {isLoading ? <Loading /> : <MerchantList merchants={merchants} />}
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
