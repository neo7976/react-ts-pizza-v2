import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {RootState} from "../store";
import {ISortCategory} from "../../modals/products";


// Define the initial state using that type
const initialState: ISortCategory = {
    categoryId: 0,
    sort: {
        name: 'популярности',
        sortProperty: 'rating',
    }

} as ISortCategory;

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        // increment: (state) => {
        //     state.value += 1
        // },
        // decrement: (state) => {
        //     state.value -= 1
        // },
        // incrementByAmount: (state, action: PayloadAction<number>) => {
        //     state.value += action.payload
        // },
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload;
        },
    },
})

export const {setCategoryId} = filterSlice.actions

// export const selectCount = (state: RootState) => state.filters

export default filterSlice.reducer;