import React, {useEffect, useState} from 'react';
import {useSearchUsersQuery} from "../store/github/github.api";
import {useDebounce} from "../hooks/debounce";

export function HomePage() {
    const [search, setSearch] = useState('');
    const debounce = useDebounce(search)
    const {isLoading, isError, data} = useSearchUsersQuery('neo');
    // console.log(data);

    /*
    Использовали до момента написания хука useDebounce
    useEffect(() => {
          console.log(search)
        }, [search])
    */

    useEffect(() => {
        console.log(debounce)
    }, [debounce])

    return (
        <div className={'flex justify-center pt-10 mx-auto h-screen w-screen'}>
            {isError && <p className={'text-center text-red-600'}>Something went wrong...</p>}
            <div className={'relative w-[560px]'}>
                <input
                    className={'border py-2 px-4 w-full h-[42px] mb-2 '}
                    type="text"
                    placeholder={'Search for github username...'}
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />

                <div className={'absolute top-[42[x] left-0 right-0 max-h-[200px] shadow-md bg-white'}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, unde.
                </div>
            </div>

        </div>
    );

}
