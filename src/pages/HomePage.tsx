import React, {useEffect, useState} from 'react';
import {useSearchUsersQuery} from "../store/github/github.api";
import {useDebounce} from "../hooks/debounce";

export function HomePage() {
    const [search, setSearch] = useState('');
    const [dropDown, setDropDown] = useState(false);
    const debounce = useDebounce(search)
    const {isLoading, isError, data} = useSearchUsersQuery(debounce, {
        skip: debounce.length < 3 // Не отправляем запрос, если он меньше 3 символов
    });
    // console.log(data);

    /*
    Использовали до момента написания хука useDebounce
    useEffect(() => {
          console.log(search)
        }, [search])
    */

    useEffect(() => {
        console.log(debounce)
        setDropDown(debounce.length > 3 && data?.length! > 0)
    }, [debounce, data])

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

                {dropDown &&
                    <ul className={'list-none absolute top-[42[x] left-0 right-0 max-h-[200px] bg-white overflow-y-scroll shadow-md '}>
                        {isLoading && <p className={'text-center'}>Loading...</p>}
                        {data?.map(user => (
                            <li
                                key={user.id}
                                className={'py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer'}
                            >
                                {user.login}
                            </li>
                        ))}
                    </ul>}
            </div>

        </div>
    );

}
