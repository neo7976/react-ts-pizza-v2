import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface IPagination {
    countPage: number,
    currentPage: number
}

const initialState: IPagination = {
    countPage: 1,
    currentPage: 1
} as IPagination

export const paginationSlice = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        setCountPage(state, action: PayloadAction<number>) {
            state.countPage = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
    },
})

export const {setCountPage, setCurrentPage} = paginationSlice.actions

// export const selectCount = (state: RootState) => state.search

export default paginationSlice.reducer;