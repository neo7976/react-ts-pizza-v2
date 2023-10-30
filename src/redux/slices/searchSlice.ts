import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface ISearch {
    searchValue: string
}

const initialState: ISearch = {
    searchValue: ''
} as ISearch

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearch(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },

    },
})

export const {setSearch} = searchSlice.actions

// export const selectCount = (state: RootState) => state.search

export default searchSlice.reducer;