import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import styles from './Search.module.scss'
import {GrClose} from "react-icons/gr";
import {BsSearch} from "react-icons/bs";
import {useAppDispatch, useAppSelector} from "../../hooks/hook";
import debounce from "lodash.debounce"
import {setSearch} from "../../redux/slices/filtersSlice";


const Search = () => {
    const dispatch = useAppDispatch();
    const search = useAppSelector((state) => state.filter.searchValue)
    const [value, setValue] = useState("");

    const inputRef = React.useRef<HTMLInputElement>(null);

    const onClickClose = () => {
        dispatch(setSearch(''));
        setValue('');
        // Используется в HTML, а для React меняем запись иначе
        // document.querySelector('input')!.focus();
        inputRef.current?.focus();
    }

    const updateSearchValue = React.useCallback(
        debounce((str: string) => {
            dispatch(setSearch(str));
        }, 500),
        [],
    );

    const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        updateSearchValue(event.target.value);
    }


    return (
        <div className={styles.root}>
            <div className={styles.icon}><BsSearch/></div>
            <input
                // ссылка на input
                ref={inputRef}
                className={styles.input}
                type="text"
                placeholder={'Поиск пиццы...'}
                value={value}
                onChange={onChangeInput}
            />
            {search &&
                <div
                    className={styles.clearIcon}
                    onClick={onClickClose}
                ><GrClose/>
                </div>
            }
        </div>
    );
};


export default Search;
