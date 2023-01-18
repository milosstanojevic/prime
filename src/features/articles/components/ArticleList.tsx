import React from 'react';
import styles from './ArticleList.module.css';
import { ArticleListItem } from './ArticleListItem';
import { descSort } from '../../utils';
import { ArticleProvider } from '..';
import { Article } from '../types';
import { Section, Table } from '../../../components';

type Props = {
    articles?: Article[];
    limit?: number;
    articleCount?: number;
};

export const ArticleList: React.FC<Props> = ({ articles, limit = 10, articleCount }) => {
    const sortedArticles = React.useMemo(() => {
        return (articles || []).sort((a, b) => {
            if (a.created && b.created) {
                return descSort(+a.created, +b.created);
            }
            if (a.name && b.name) {
                return descSort(a.name, b.name);
            }
            return 0;
        });
    }, [articles]);

    if (articles?.length === 0) {
        return <Section centered>No Results</Section>;
    }

    return (
        <Table pagination={{ limit, count: articleCount }}>
            {sortedArticles.map((article) => (
                <ArticleProvider key={article.id} article={article}>
                    <ArticleListItem />
                </ArticleProvider>
            ))}
        </Table>
    );
};
