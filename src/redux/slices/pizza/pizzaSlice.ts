import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {Pizza, PizzaSliceState} from "./types";

const initialState: PizzaSliceState = {
    items: [],
} as PizzaSliceState;

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<Pizza[]>) {
            state.items = action.payload
        },
    },
});

export const {setItems} = pizzaSlice.actions

// export const selectCount = (state: RootState) => state.filters

export default pizzaSlice.reducer;