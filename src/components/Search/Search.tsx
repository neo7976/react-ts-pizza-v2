import React from 'react';
import styles from './Search.module.scss'

interface SearchProps {
    search: string,
    setSearch: (value: (((prevState: string) => string) | string)) => void
}

const Search = ({search, setSearch}: SearchProps) => {
    return (
        <div className={styles.root}>
            <svg
                className={styles.icon}
                xmlns="http://www.w3.org/2000/svg"
                enable-background="new 0 0 64 64" height="64px" id="Layer_1" version="1.1" viewBox="0 0 64 64"
                width="64px">
                <g>
                    <circle cx="32" cy="25" fill="none" r="16" stroke="#4D4D4D" stroke-linecap="round"
                            stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
                    <line
                        fill="none" stroke="#4D4D4D" stroke-linecap="round" stroke-linejoin="round"
                        stroke-miterlimit="10"
                        x1="40.9" x2="38.8" y1="44.1" y2="39.5"/>
                    <line fill="none" stroke="#4D4D4D" stroke-linecap="round"
                          stroke-linejoin="round" stroke-miterlimit="10"
                          stroke-width="4" x1="40.9" x2="46" y1="44.1" y2="55"/>
                    <path
                        d="M36.2,13.7   c2.7,1,4.9,2.9,6.3,5.3" fill="none" stroke="#4D4D4D" stroke-linecap="round"
                        stroke-linejoin="round" stroke-miterlimit="10"/>
                </g>
            </svg>
            <input
                className={styles.input}
                type="text"
                placeholder={'Поиск пиццы...'}
                value={search}
                onChange={(event) => setSearch(event.target.value)}
            />
            {search && <svg
                className={styles.clearIcon}
                onClick={() => setSearch('')}
                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <g>
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path
                        d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"/>
                </g>
            </svg>}
        </div>
    );
};

export default Search;
