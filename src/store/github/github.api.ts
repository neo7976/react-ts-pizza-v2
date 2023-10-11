import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IUsers, ServerResponse} from "../../modals/modals";

export const githubApi = createApi({
    reducerPath: 'github/api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.github.com/'
    }),
    endpoints: build => ({
        /*
        1 - что получаем в ответ от сервера (сначала ставим any, смотрит ответ с сервера, генерируем json в ts (https://app.quicktype.io/?l=ts)),
        2 - что хотим принимать
        Закомментированная строка была до написания transformResponse
         */
        // searchUsers: build.query<ServerResponse<IUsers>, string>({
        searchUsers: build.query<IUsers[], string>({
            query: (search: string) => ({
                url: `search/users`,
                params: {
                    q: search,
                    per_page: 10 //лимит получения
                }
            }),
            //Трансформируем данные из ответа
            transformResponse: (response: ServerResponse<IUsers>) => response.items
        })
    })
})

export const {useSearchUsersQuery} = githubApi