import {configureStore} from '@reduxjs/toolkit'
import filter from "./slices/filtersSlice";
import search from "./slices/searchSlice";

export const store = configureStore({
    reducer: {
        filter,
        search
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch