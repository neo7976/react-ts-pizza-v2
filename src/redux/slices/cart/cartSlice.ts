import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
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
            const findItem = state.items.find(item => item.id === action.payload.id && item.size === action.payload.size && item.type === action.payload.type)
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
        minusItem(state, action: PayloadAction<CartItem>) {
            const findItem = state.items.find(item => item.id === action.payload.id && item.size === action.payload.size && item.type === action.payload.type)
            if (findItem) {
                findItem.count--;
            }
            state.totalPrice = state.items.reduce((sum, item) => {
                return item.price * item.count + sum
            }, 0);
        },
        removeItem(state, action: PayloadAction<CartItem>) {
            const findItem = state.items.find(item => item.id === action.payload.id && item.size === action.payload.size && item.type === action.payload.type)
            if (findItem) {
                state.items = state.items.filter(item => item !== findItem)
            }
            state.totalPrice = state.items.reduce((sum, item) => {
                return item.price * item.count + sum
            }, 0);
        },
        clearItems(state) {
            state.items = [];
        }
    },
});

export const {addItem, removeItem, minusItem, clearItems} = cartSlice.actions

// export const selectCount = (state: RootState) => state.filters

export default cartSlice.reducer;