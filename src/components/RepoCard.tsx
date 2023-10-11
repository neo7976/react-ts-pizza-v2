import React, {FC, useState} from 'react';
import {IRepo} from "../modals/modals";
import {useActions} from "../hooks/actions";
import {useAppSelector} from "../hooks/redux";
import {MdAssignmentAdd} from "react-icons/md";
import {AiOutlineDelete} from "react-icons/ai";

interface RepoCardProps {
    repo: IRepo
}

const RepoCard: FC<RepoCardProps> = ({repo}) => {

    const {addFavourite, removeFavourite} = useActions()
    const {favourites} = useAppSelector(state => state.github)

    const [isFavourite, setIsFavourite] = useState(favourites.includes(repo.html_url));
    const addToFavorites = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        addFavourite(repo.html_url);
        setIsFavourite(true)
    };


    const removeFromFavorites = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        removeFavourite(repo.html_url);
        setIsFavourite(false)
    };
    return (
        <div
            className={'border py-3 px-5 rounded cursor-pointer mb-2 hover:shadow-md hover:bg-gray-100 transition-all'}>
            <a href={repo.html_url} target={'_blank'} rel={'noopener'}>
                <h2 className={'text-lg font-bold'}> {repo.full_name}</h2>
                <p className={'text-sm'}>
                    Forks: <span className={'font-bold mr-2'}>{repo.forks}</span>
                    Watchers: <span className={'font-bold'}>{repo.watchers}</span>
                </p>
                <p className={'text-sm font-thin'}>{repo?.description}</p>

                {!isFavourite && <button
                    className={'text-2xl py-1 px-2 bg-yellow-400 mr-2 rounded hover:shadow-md transition-all'}
                    onClick={addToFavorites}
                ><MdAssignmentAdd/>
                </button>}

                {isFavourite && <button
                    className={'text-2xl py-1 px-2 bg-red-600 rounded hover:shadow-md transition-all'}
                    onClick={removeFromFavorites}
                ><AiOutlineDelete/>
                </button>}
            </a>
        </div>
    );
}

export default RepoCard;
