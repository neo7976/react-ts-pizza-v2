import React from 'react';
import {useAppSelector} from "../hooks/redux";

export function FavoritesPage() {
    const {favourites} = useAppSelector(state => state.github)

    if (favourites.length === 0) {
        return <p className={'text-center'}>No items...</p>
    }

    return (
        <div className={'flex justify-center pt-10 mx-auto h-screen w-screen'}>
            <ul className={'list-none'}>
                {favourites.map(favourite => (
                    <li key={favourite}>
                        <a href={favourite} target={'_blank'} rel={'noopener'}>{favourite}</a>
                    </li>
                ))}
            </ul>
        </div>

    );

}
