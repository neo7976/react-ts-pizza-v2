import React from 'react';
import styles from './Search.module.scss'
import {GrClose} from "react-icons/gr";
import {BsSearch} from "react-icons/bs";
import {useAppDispatch, useAppSelector} from "../../hooks/hook";
import {setSearch} from "../../redux/slices/searchSlice";


const Search = () => {
    const dispatch = useAppDispatch();
    const search = useAppSelector((state) => state.search.searchValue)

    return (
        <div className={styles.root}>
            <div className={styles.icon}><BsSearch/></div>
            <input
                className={styles.input}
                type="text"
                placeholder={'Поиск пиццы...'}
                value={search}
                onChange={(event) => dispatch(setSearch(event.target.value))}
            />
            {search &&
                <div
                    className={styles.clearIcon}
                    onClick={() => dispatch(setSearch(''))}
                ><GrClose/>
                </div>
            }
        </div>
    );
};

export default Search;
