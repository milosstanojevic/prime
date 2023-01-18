import React from 'react';
import styles from './ArticlesPage.module.css';
import { Button, Search, Modal } from '../../../components';
import { ArticleList } from './ArticleList';
import { Loading } from '../../../components';
import { ArticleForm } from '..';
import { useAddArticle, useGetPaginatedArticles } from '../api';
import { Article } from '../types';
import { useSearchParams } from 'react-router-dom';

const limit = 10;

export const ArticlesPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const offsetParam = searchParams.get('offset');
    const search = searchParams.get('search');
    const offset = offsetParam ? +offsetParam : 0;

    const params = {
        limit,
        offset,
        ...(search && { search })
    };

    const { data, isLoading } = useGetPaginatedArticles(params);
    const mutationAdd = useAddArticle((oldData = [], newData) => [...oldData, newData]);

    const [showCreateArticle, setShowCreateArticle] = React.useState(false);
    const handleShowCreateArticle = React.useCallback(() => {
        setShowCreateArticle(true);
    }, []);

    const handleCloseCreateArticle = React.useCallback(() => {
        setShowCreateArticle(false);
    }, []);

    const handleSubmit = React.useCallback(
        (attributes: Article) => {
            mutationAdd.mutateAsync(attributes);
            handleCloseCreateArticle();
        },
        [handleCloseCreateArticle, mutationAdd]
    );

    return (
        <div className={styles.page}>
            <div className={styles.page_header}>
                <div>
                    <Button mode="primary" onClick={handleShowCreateArticle}>
                        +
                    </Button>
                </div>

                <Search placeholder="Search By Name or Serial..." />
            </div>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <ArticleList
                        articles={data?.results}
                        articleCount={data?.count}
                        limit={limit}
                    />
                </>
            )}
            <Modal open={showCreateArticle} onClose={handleCloseCreateArticle}>
                <div className={styles.modal_form_wrapper}>
                    <ArticleForm
                        onCancel={handleCloseCreateArticle}
                        onSubmit={handleSubmit}
                        isSubmitting={mutationAdd.isLoading}
                    />
                </div>
            </Modal>
        </div>
    );
};
