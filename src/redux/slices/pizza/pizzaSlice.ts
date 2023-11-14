import type {PayloadAction} from '@reduxjs/toolkit'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {Pizza, PizzaSliceState, StatusLoading} from "./types";
import axios from "axios";
import {IProduct, Root} from "../../../modals/products";
import {SearchPizzaParams} from "./types";

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus',
    async (params: SearchPizzaParams) => {
        const {
            url,
            sortBy,
            category,
            startWithTitle,
            limit,
            page,
        } = params;
        const response = await axios.get<Root<IProduct>>(`${url}pizzas/?${page}&${limit}&${category}&${startWithTitle}&sortBy=${sortBy}&order=desc`);
        return response.data
    }
)

const initialState: PizzaSliceState = {
    items: [],
    status: StatusLoading.NONE,
    countPage: 1,
} as PizzaSliceState;

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<Pizza[]>) {
            state.items = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state, action) => {
            state.status = StatusLoading.LOADING;
            state.items = [];
        })
        builder.addCase(fetchPizzas.fulfilled, (state,action) => {
            state.items = action.payload.data
            state.countPage=action.payload.pageCount
            state.status = StatusLoading.SUCCESS;
        })
        builder.addCase(fetchPizzas.rejected, (state, action) => {
            console.log('Ошибка получения данных с сервера');
            state.items = [];
            state.status = StatusLoading.ERROR;
        })
    },
});

export const {setItems} = pizzaSlice.actions

// export const selectCount = (state: RootState) => state.filters

export default pizzaSlice.reducer;