import React from 'react';
import {useSearchUsersQuery} from "../store/github/github.api";

export function HomePage() {
    const {isLoading, isError, data} = useSearchUsersQuery('neo');
    console.log(data);
    return (
        <div>Home</div>
    );

}
