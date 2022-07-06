import React from 'react';
import { Bubble, Button, Loading, Modal, SelectOption, SidePicker } from '../../../components';
import {
    RegalForm,
    RegalPage,
    useAddWarehouseRegal,
    useGetWarehouseRegals
} from '../../warehouse_regals';
import { useGetArticles } from '../../articles';
import styles from './WarehouseArticlesPage.module.css';
import { useGetWarehouse, WarehouseNavPills } from '../../warehouses';
import { useParams } from 'react-router-dom';
import { useGetWarehouseArticles } from '..';
import { Regal } from 'features/warehouse_regals/types';

export const WarehouseArticlesPage: React.FC = () => {
    const params = useParams();
    const id = Number(params.id);

    const [show, setShow] = React.useState(false);

    const { data: warehouse, isLoading: isWarehouseLoading } = useGetWarehouse(id);

    const { data: articles, isLoading: isArticlesLoading } = useGetArticles();

    const { data: warehouseArticles, isLoading: isWarehouseArticlesLoading } =
        useGetWarehouseArticles(id);

    const { data: regals, isLoading: isWarehouseRegalsLoading } = useGetWarehouseRegals(id);

    const mutateAdd = useAddWarehouseRegal(id, (oldData, newData) => [...oldData, newData]);

    const [regalId, setRegalId] = React.useState(regals?.length ? regals[0].id : 0);

    const isLoading =
        isWarehouseLoading ||
        isArticlesLoading ||
        isWarehouseArticlesLoading ||
        isWarehouseRegalsLoading;

    React.useEffect(() => {
        if (regals?.length) {
            setRegalId(regals[0].id);
        }
    }, [regals]);

    const handleChange = React.useCallback((id: string | number) => {
        setRegalId(+id);
    }, []);

    const handleShowModal = React.useCallback(() => {
        setShow(true);
    }, []);

    const handleCloseModal = React.useCallback(() => {
        setShow(false);
    }, []);

    const handleSubmit = React.useCallback(
        (attributes: Regal) => {
            mutateAdd.mutate(attributes);
            handleCloseModal();
        },
        [mutateAdd, handleCloseModal]
    );

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <div className={styles.page}>
                        <div className={styles.warehouse_nav}>
                            <div>{warehouse?.name}</div>
                        </div>
                        {regals?.length ? (
                            <div className={styles.side_picker_wrapper}>
                                <Button onClick={handleShowModal}>Create Regal</Button>
                                <SidePicker
                                    className={styles.side_picker}
                                    options={regals as SelectOption[]}
                                    selectedId={regals[0].id}
                                    onChange={handleChange}
                                />
                            </div>
                        ) : (
                            <Button onClick={handleShowModal}>Create Regal</Button>
                        )}
                        <WarehouseNavPills id={id} />
                    </div>
                    {regalId && regalId > 0 ? (
                        <RegalPage
                            regalId={regalId}
                            warehouseId={id}
                            articles={articles}
                            warehouseArticles={warehouseArticles}
                        />
                    ) : null}
                </>
            )}
            <Modal open={show} onClose={handleCloseModal}>
                <Bubble className={styles.regal_modal}>
                    <div>Create Regal</div>
                    <RegalForm onCancel={handleCloseModal} onSubmit={handleSubmit} />
                </Bubble>
            </Modal>
        </>
    );
};
