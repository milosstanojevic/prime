import React, { useCallback, useState, FC } from 'react';
import { TransportOrderArticle } from '../types';
import { Button, Input, KeyCodes, Select, SelectOption } from '../../../components';
import styles from './TransportOrderArticleForm.module.css';
import { Article } from 'features/articles/types';
import { decamelizeKeys } from 'humps';

interface ITransportOrderArticleForm {
    className?: string;
    onSubmit?: (attributes: TransportOrderArticle) => void;
    onCancel?: () => void;
    transportOrderArticle?: TransportOrderArticle;
    articles: Article[];
}

export const TransportOrderArticleForm: FC<ITransportOrderArticleForm> = ({
    className,
    onSubmit,
    onCancel,
    transportOrderArticle = {},
    articles
}) => {
    const [articleForm, setArticleForm] = useState(transportOrderArticle);

    const isValid = React.useMemo<boolean>(() => {
        return (
            articleForm.articleId !== undefined &&
            articleForm.articleId > 0 &&
            articleForm.requestedQuantity !== undefined &&
            articleForm.requestedQuantity > 0
        );
    }, [articleForm]);

    const handleSubmit = useCallback(
        (e: React.SyntheticEvent) => {
            e.preventDefault();
            if (isValid && typeof onSubmit === 'function') {
                onSubmit(decamelizeKeys(articleForm));
            }
        },
        [onSubmit, isValid, articleForm]
    );

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLFormElement>) => {
            if (e.key === KeyCodes.enter) {
                handleSubmit(e);
            } else if (e.key === KeyCodes.escape && typeof onCancel === 'function') {
                onCancel();
            }
        },
        [handleSubmit, onCancel]
    );

    const handleClose = React.useCallback(() => {
        onCancel && onCancel();
    }, [onCancel]);

    const handleQuantityChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        const requestedQuantity = !isNaN(value) ? value : 0;
        setArticleForm((prevState) => ({ ...prevState, requestedQuantity }));
    }, []);

    const handleChange = useCallback((ids: Array<string | number>) => {
        const articleId = +ids[0];
        setArticleForm((prevState) => ({ ...prevState, articleId }));
    }, []);

    const target = React.useMemo(() => {
        const article = articles.find((article) => article.id === articleForm.articleId);
        if (article) {
            return <Button>{article.name}</Button>;
        }
        return <Button>Choose Article</Button>;
    }, [articleForm, articles]);

    return (
        <form
            className={`${styles.form} ${className}`}
            onSubmit={handleSubmit}
            onKeyDown={handleKeyDown}
        >
            <div className={styles.form_inner}>
                <Select
                    target={target}
                    selectedOptionIds={[articleForm.articleId || '']}
                    options={articles as SelectOption[]}
                    onChange={handleChange}
                    closeOnAction
                />
                <Input
                    onChange={handleQuantityChange}
                    name="quantity"
                    type="number"
                    value={articleForm.requestedQuantity}
                    className={styles.quantity_input}
                    placeholder="Add quantity..."
                />
            </div>
            <div className={styles.form_buttons}>
                <Button mode="primary" type="submit" disabled={!isValid}>
                    Add
                </Button>
                <Button mode="secondary" onClick={handleClose} className={styles.cancel_button}>
                    Cancel
                </Button>
            </div>
        </form>
    );
};
