import type {PayloadAction} from '@reduxjs/toolkit'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {Pizza, PizzaSliceState} from "./types";
import axios from "axios";
import {Root} from "../../../modals/products";

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus',
    async (params: any) => {
        const {
            url,
            sortBy,
            category,
            startWithTitle,
            limit,
            page,
        } = params;
        const response = await axios.get<Root>(`${url}pizzas/?${page}&${limit}&${category}&${startWithTitle}&sortBy=${sortBy}&order=desc`);
        return response.data.data
    }
)

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