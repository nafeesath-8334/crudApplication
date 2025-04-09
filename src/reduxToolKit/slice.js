import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn: false,
}

export const olxSlice = createSlice({
    name: 'olx',
    initialState,
    reducers: {
        updateIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload
        },
    },
})

export const { updateIsLoggedIn } = olxSlice.actions

export default olxSlice.reducer