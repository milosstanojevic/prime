export const descSort = (a: number | string, b: number | string) => {
    if (a === b) {
        return 0;
    }
    return a < b ? 1 : -1;
};

export const ascSort = (a: number | string, b: number | string) => {
    if (a === b) {
        return 0;
    }
    return a < b ? -1 : 1;
};
