import React from 'react';
import styles from './Search.module.scss'
import {GrClose} from "react-icons/gr";
import {BsSearch} from "react-icons/bs";


interface SearchProps {
    search: string,
    setSearch: (value: (((prevState: string) => string) | string)) => void
}

const Search = ({search, setSearch}: SearchProps) => {
    return (
        <div className={styles.root}>
            <div className={styles.icon}><BsSearch/></div>
            <input
                className={styles.input}
                type="text"
                placeholder={'Поиск пиццы...'}
                value={search}
                onChange={(event) => setSearch(event.target.value)}
            />
            {search &&
                <div
                    className={styles.clearIcon}
                    onClick={() => setSearch('')}
                ><GrClose/>
                </div>
            }
        </div>
    );
};

export default Search;
