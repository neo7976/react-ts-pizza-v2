import {configureStore} from '@reduxjs/toolkit'
import filter from "./slices/filtersSlice";
import cart from "./slices/cart/cartSlice";
import pizza from "./slices/pizza/pizzaSlice";

export const store = configureStore({
    reducer: {
        filter,
        cart,
        pizza
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch