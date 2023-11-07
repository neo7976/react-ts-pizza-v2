import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import {IProduct} from "../../../modals/products";
import {CartItem, CartSliceState} from "./types";

const initialState: CartSliceState = {
    items: [],
    totalPrice: 0

} as CartSliceState;

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // addItem(state, action: PayloadAction<CartItem>) {
        //     state.items.push(action.payload)
        //     state.totalPrice = state.items.reduce((sum, item) => {
        //         return item.price + sum
        //     }, 0);
        // },
        addItem(state, action: PayloadAction<CartItem>) {
            const findItem = state.items.find(item => item.id === action.payload.id)
            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                })
            }
            state.totalPrice = state.items.reduce((sum, item) => {
                return item.price * item.count + sum
            }, 0);
        },
        removeItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter(item => item.id !== action.payload)
        },
        clearItems(state) {
            state.items = [];
        }
    },
});

export const {addItem, removeItem, clearItems} = cartSlice.actions

// export const selectCount = (state: RootState) => state.filters

export default cartSlice.reducer;