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
            <ul className={'list-none'}>
                {favourites.map(favourite => (
                    <li key={favourite}>
                        <a href={favourite} target={'_blank'} rel={'noopener'}>{favourite}</a>
                        <button
                            className={'ml-2 text-2xl py-1 px-2 bg-red-600 rounded hover:shadow-md hover:bg-red-400 transition-all'}
                            onClick={() => clickHandler(favourite)}
                        ><AiOutlineDelete/>
                        </button>
                    </li>
                ))}
            </ul>
        </div>

    );

}
