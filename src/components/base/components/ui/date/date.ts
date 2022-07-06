import format from 'date-fns/format';

export const formatDate = (timestamp: number, dateFormat: string): string => {
    return format(new Date(timestamp), dateFormat);
};
