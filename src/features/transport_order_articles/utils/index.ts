export const getTransportOrderArticleStatus = (status?: string) => {
    if (status === '2') {
        return 'Added';
    }

    return 'Pending';
};
