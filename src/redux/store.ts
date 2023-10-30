import {configureStore} from '@reduxjs/toolkit'
import filter from "./slices/filtersSlice";
import search from "./slices/searchSlice";
import pagination from "./slices/paginationSlice";

export const store = configureStore({
    reducer: {
        filter,
        search,
        pagination
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch