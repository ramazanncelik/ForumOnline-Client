import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    favoritePosts: [],
}

const favoritePosts = createSlice({
    name: 'favoritePosts',
    initialState,
    reducers: {
        setFavoritePosts: (state, action) => {
            state.favoritePosts = action.payload
        },
        appendFavoritePosts: (state, action) => {
            state.favoritePosts = [...state.favoritePosts, action.payload]
        },
    }
});

export const { setFavoritePosts,appendFavoritePosts } = favoritePosts.actions
export default favoritePosts.reducer;