import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {RootState} from "../store";
import {ISort, FilterSliceState} from "../../modals/products";


// Define the initial state using that type
const initialState: FilterSliceState = {
    categoryId: 0,
    currentPage: 1,
    searchValue: '',
    sort: {
        name: 'популярности',
        sortProperty: 'rating',
    }

} as FilterSliceState;

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload;
        },
        setSort(state, action: PayloadAction<ISort>) {
            state.sort = action.payload;
        },
        // setCountPage(state, action: PayloadAction<number>) {
        //     state.countPage = action.payload;
        // },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setSearch(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },
        setFilters(state, action: PayloadAction<FilterSliceState>) {
            if (Object.keys(action.payload).length) {
                state.currentPage = Number(action.payload.currentPage);
                state.categoryId = Number(action.payload.categoryId);
                state.sort = action.payload.sort;
                // state.countPage = action.payload.countPage;
            } else {
                state.currentPage = 1;
                state.categoryId = 0;
                state.sort = {
                    name: 'популярности',
                    sortProperty: 'rating',
                };
            }
        },
    },
});

export const {setCategoryId, setSort, setCurrentPage, setSearch,  setFilters} = filterSlice.actions

// export const selectCount = (state: RootState) => state.filters

export default filterSlice.reducer;