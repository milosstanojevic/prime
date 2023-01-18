import React, { ChangeEventHandler } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Input } from '../input';
import styles from './Search.module.scss';

interface SearchProps {
    placeholder?: string;
}

interface FormElements extends HTMLFormControlsCollection {
    search: HTMLInputElement;
}

interface HTMLFormInputElement extends HTMLFormElement {
    readonly elements: FormElements;
}

export const Search: React.FC<SearchProps> = ({ placeholder = 'Search...' }) => {
    const [_, setSearchParams] = useSearchParams();
    const [searchValue, setSearchValue] = React.useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormInputElement>) => {
        e.preventDefault();
        setSearchParams((prevState) => {
            const value = e.currentTarget.elements.search.value;
            prevState.set('search', value);
            prevState.delete('offset');
            return prevState;
        });
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);
    };

    const handleClear = () => {
        setSearchValue('');
        setSearchParams((prevState) => {
            prevState.delete('search');
            return prevState;
        });
    };
    return (
        <form onSubmit={handleSubmit} className={styles.formWrapper}>
            <Input
                className={styles.input}
                placeholder={placeholder}
                onChange={handleOnChange}
                name="search"
                value={searchValue}
            />
            <button type="button" className={styles.clearBtn} onClick={handleClear}>
                X
            </button>
        </form>
    );
};
