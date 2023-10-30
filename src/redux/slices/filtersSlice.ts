import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {RootState} from "../store";
import {ISort, ISortCategory} from "../../modals/products";


// Define the initial state using that type
const initialState: ISortCategory = {
    categoryId: 0,
    sort: {
        name: 'популярности',
        sortProperty: 'rating',
    }

} as ISortCategory;

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
    },
})

export const {setCategoryId, setSort} = filterSlice.actions

// export const selectCount = (state: RootState) => state.filters

export default filterSlice.reducer;