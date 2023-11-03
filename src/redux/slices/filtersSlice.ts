import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {RootState} from "../store";
import {ISort, FilterSliceState} from "../../modals/products";


// Define the initial state using that type
const initialState: FilterSliceState = {
    categoryId: 0,
    countPage: 1,
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
        setCountPage(state, action: PayloadAction<number>) {
            state.countPage = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setSearch(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },
        setFilters(state, action: PayloadAction<FilterSliceState>) {
            state.categoryId = Number(action.payload.categoryId);
            state.sort = action.payload.sort;
        }
    },
})

export const {setCategoryId, setSort, setCurrentPage, setSearch,setCountPage,setFilters} = filterSlice.actions

// export const selectCount = (state: RootState) => state.filters

export default filterSlice.reducer;