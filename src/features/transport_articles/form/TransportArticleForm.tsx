import { Button, Loading } from '../../../components';
import { useGetArticle } from '../../../features/articles';
import React, { useState } from 'react';
import { TransportArticle } from '../types';
import { TransportArticleOptionSelect } from './TransportArticleOptionSelect';
import { TransportArticleQtyInput } from './TransportArticleQtyInput';

type Attributes = {
    article: number;
    warehouse: number;
    regal: number;
    regal_position: number;
    quantity: number;
};

type Props = {
    transportArticle?: TransportArticle;
    onSave?: (attributes: Attributes) => Promise<any>;
    onCancel?: () => void;
    className?: string;
    isSaving?: boolean;
    hideCancel?: boolean;
};

const initialState = {
    article: 0,
    warehouse: 0,
    regal: 0,
    regal_position: 0,
    quantity: 0
};

export const TransportArticleForm: React.FC<Props> = ({
    transportArticle,
    onSave,
    onCancel,
    className,
    isSaving = false,
    hideCancel = false
}) => {
    const { data: article, isLoading } = useGetArticle(transportArticle?.article || 0);

    const defaultFormState = React.useMemo(() => {
        return {
            ...initialState,
            article: transportArticle?.article || 0
        };
    }, [transportArticle]);

    const [form, setForm] = useState(() => defaultFormState);

    const handleWarehouseChange = React.useCallback((warehouse: number) => {
        setForm((prevState) => ({
            ...prevState,
            warehouse,
            regal: 0,
            regal_position: 0,
            quantity: 0
        }));
    }, []);

    const handleRegalChange = React.useCallback((regal: number) => {
        setForm((prevState) => ({
            ...prevState,
            regal,
            regal_position: 0,
            quantity: 0
        }));
    }, []);

    const handleRegalPositionChange = React.useCallback((regalPositionId: number) => {
        setForm((prevState) => ({ ...prevState, regal_position: regalPositionId, quantity: 0 }));
    }, []);

    const handleQtyChange = React.useCallback((quantity: number) => {
        setForm((prevState) => ({ ...prevState, quantity }));
    }, []);

    const show = React.useMemo(() => {
        return {
            warehouseSelect: form.article > 0,
            regalSelect: form.article > 0 && form.warehouse > 0,
            regalPositionSelect: form.article > 0 && form.warehouse > 0 && form.regal > 0,
            qtyInput:
                form.article > 0 && form.warehouse > 0 && form.regal > 0 && form.regal_position > 0,
            saveBtn:
                form.article > 0 &&
                form.warehouse > 0 &&
                form.regal > 0 &&
                form.regal_position > 0 &&
                form.quantity > 0
        };
    }, [form]);

    const handleSave = React.useCallback(() => {
        onSave && onSave(form).then(() => setForm(defaultFormState));
    }, [form, onSave, defaultFormState]);

    const itemStyle: React.CSSProperties = {
        padding: '15px'
    };

    return isLoading ? (
        <Loading />
    ) : (
        <div className={className}>
            <div style={itemStyle}>{article?.name}</div>
            <div style={itemStyle}>
                {show.warehouseSelect ? (
                    <TransportArticleOptionSelect
                        articleId={form.article}
                        onChange={handleWarehouseChange}
                    />
                ) : (
                    <span>Article not found</span>
                )}
            </div>
            <div style={itemStyle}>
                {show.regalSelect ? (
                    <TransportArticleOptionSelect
                        articleId={form.article}
                        warehouseId={form.warehouse}
                        onChange={handleRegalChange}
                    />
                ) : (
                    <span>Select Warehouse</span>
                )}
            </div>
            <div style={itemStyle}>
                {show.regalPositionSelect ? (
                    <TransportArticleOptionSelect
                        articleId={form.article}
                        warehouseId={form.warehouse}
                        regalId={form.regal}
                        onChange={handleRegalPositionChange}
                    />
                ) : (
                    <span>Select Regal</span>
                )}
            </div>
            <div style={itemStyle}>
                {show.qtyInput ? (
                    <TransportArticleQtyInput
                        articleId={form.article}
                        warehouseId={form.warehouse}
                        regalId={form.regal}
                        regalPositionId={form.regal_position}
                        onChange={handleQtyChange}
                    />
                ) : (
                    <span>Select Position</span>
                )}
            </div>
            <div style={{ ...itemStyle, textAlign: 'center' }}>
                <Button disabled={!show.saveBtn || isSaving} onClick={handleSave}>
                    Save
                </Button>
                {!hideCancel ? (
                    <Button mode="secondary" onClick={onCancel} style={{ marginLeft: '15px' }}>
                        Cancel
                    </Button>
                ) : null}
            </div>
        </div>
    );
};
