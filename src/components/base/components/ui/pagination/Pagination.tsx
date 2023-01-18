import * as React from 'react';
import styles from './Pagination.module.scss';
import ReactPaginate from 'react-paginate';
import { useSearchParams } from 'react-router-dom';

export interface PaginationProps {
    count?: number;
    limit: number;
}

const Pagination: React.FC<PaginationProps> = ({ count = 0, limit }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const defaultOffset = searchParams.get('offset');
    const [offset, setOffset] = React.useState(defaultOffset ? +defaultOffset : 0);
    const handlePageClick = React.useCallback(
        (item: { selected: number }) => {
            const newOffset = (item.selected * limit) % count;
            setOffset(newOffset);
            setSearchParams((prevState) => {
                prevState.set('offset', `${newOffset}`);
                return prevState;
            });
        },
        [limit, count]
    );
    return count > 0 ? (
        <ReactPaginate
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            pageCount={Math.ceil(count / limit)}
            previousLabel="<"
            pageClassName={styles.page__numbers}
            pageLinkClassName={styles.page__link}
            previousClassName={styles.page__btn}
            disabledClassName={styles.disabled}
            // previousLinkClassName={styles.page__link}
            nextClassName={styles.page__btn}
            // nextLinkClassName={styles.page__link}
            breakLabel="..."
            forcePage={Math.round(offset / limit)}
            breakClassName={styles.page__dots}
            breakLinkClassName={styles.page__link}
            containerClassName={styles.page}
            activeClassName={styles.active}
        />
    ) : null;
};

export default Pagination;
