import React, {useEffect, useState} from 'react';
import {useLazyGetUserRepoQuery, useSearchUsersQuery} from "../store/github/github.api";
import {useDebounce} from "../hooks/debounce";
import RepoCard from "../components/RepoCard";

export function HomePage() {
    const [search, setSearch] = useState('');
    const [dropDown, setDropDown] = useState(false);
    const debounce = useDebounce(search)
    const {isLoading, isError, data} = useSearchUsersQuery(debounce, {
        skip: debounce.length < 3, // Не отправляем запрос, если он меньше 3 символов
        refetchOnFocus: true //Повторный запрос на сервер, когда вкладка стала активной
    });
    // console.log(data);

    const [fetchRepos, {isLoading: areReposLoading, data: repos}] = useLazyGetUserRepoQuery()

    /*
    Использовали до момента написания хука useDebounce
    useEffect(() => {
          console.log(search)
        }, [search])
    */

    useEffect(() => {
        // console.log(debounce)
        setDropDown(debounce.length > 3 && data?.length! > 0)
    }, [debounce, data])

    const clickHandler = (username: string) => {
        // console.log(username);
        fetchRepos(username);
        setDropDown(false);
    };
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
                                onClick={() => clickHandler(user.login)}
                            >
                                {user.login}
                            </li>
                        ))}
                    </ul>}
                <div className="container">
                    {areReposLoading && <p className={'text-center'}>Repos are loading</p>}
                    {repos?.map(
                        repo => <RepoCard repo={repo} key={repo.id}/>
                    )}
                </div>
            </div>
        </div>
    );

}
