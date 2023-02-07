import { useGetArticles } from '../../../features/articles';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetMerchantArticles } from '../api';
import MerchantTabs from '../../merchants/components/MerchantTabs';
import { Table } from '../../../components';

export const MerchantArticlesPage = () => {
    const params = useParams();
    const id = Number(params.id);

    const { data: merchantArticles } = useGetMerchantArticles(id);
    const { data: articles } = useGetArticles();

    const describedArticles = React.useMemo(() => {
        if (articles && merchantArticles) {
            return merchantArticles.map((merchantArticle) => {
                const article = articles.find((item) => item.id === merchantArticle.article);
                return article ? { ...article, ...merchantArticle } : merchantArticle;
            });
        }
        return [];
    }, [articles, merchantArticles]);
    return (
        <>
            <MerchantTabs />
            <div>
                <h4>Merchant Articles</h4>
                <Table>
                    {describedArticles.map((article) => (
                        <tr key={article.id}>
                            <td>{article.name}</td>
                            <td>{article.description}</td>
                            <td>{article.serial}</td>
                            <td>
                                {article.quantity} {article.unit}
                            </td>
                        </tr>
                    ))}
                </Table>
            </div>
        </>
    );
};
