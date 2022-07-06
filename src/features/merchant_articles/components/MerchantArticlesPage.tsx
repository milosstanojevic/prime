import { useGetArticles } from 'features/articles';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetMerchantArticles } from '../api';
import styles from './MerchantArticlesPage.module.css';

export const MerchantArticlesPage = () => {
    const params = useParams();
    const id = Number(params.id);

    const { data: merchantArticles } = useGetMerchantArticles(id);
    const { data: articles } = useGetArticles();

    const describedArticles = React.useMemo(() => {
        if (articles && merchantArticles) {
            return merchantArticles.map((merchantArticle) => {
                const article = articles.find((item) => item.id === merchantArticle.articleId);
                return article ? { ...article, ...merchantArticle } : merchantArticle;
            });
        }
        return [];
    }, [articles, merchantArticles]);
    return (
        <div>
            <h4>Merchant Articles</h4>
            {describedArticles.map((article) => (
                <div className={styles.list_wrapper} key={article.id}>
                    <div className={styles.list_item}>{article.name}</div>
                    <div className={styles.list_item}>{article.description}</div>
                    <div className={styles.list_item}>{article.barCode}</div>
                    <div className={styles.list_item}>
                        {article.quantity} {article.unit}
                    </div>
                </div>
            ))}
        </div>
    );
};
