import React from 'react';
import {useAppSelector} from "../hooks/redux";
import {AiOutlineDelete} from "react-icons/ai";
import {useActions} from "../hooks/actions";


export function FavoritesPage() {
    const {favourites} = useAppSelector(state => state.github)
    const {removeFavourite} = useActions()

    if (favourites.length === 0) {
        return <p className={'text-center'}>No items...</p>
    }

    const clickHandler = (favourite: string) => {
        removeFavourite(favourite);
    };

    return (
        <div className={'flex justify-center pt-10 mx-auto h-screen w-screen'}>
            <h1 className={'fixed mb-10 text-center font-bold mt-1 text-4xl'}>Избранные репозитории</h1>
            <ul className={'mt-12'}>
                {favourites.map(favourite => (
                    <li className={'mt-2 mb-2 py-3 px-2 text-1xl bg-blue-200 rounded hover:shadow-md hover:bg-blue-100'}
                        key={favourite}>
                        <span className={'ml-1 px-2 py-1 mr-2 border rounded-l-2xl bg-amber-400'}>{(favourites.indexOf(favourite).valueOf() + 1)}</span>
                        <a href={favourite} target={'_blank'} rel={'noopener'}>{favourite}</a>
                        <button
                            className={'ml-10 float-right text-2xl  hover:rounded hover:shadow-md hover:text-red-600 transition-all'}
                            onClick={() => clickHandler(favourite)}
                        ><AiOutlineDelete/>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );

}
