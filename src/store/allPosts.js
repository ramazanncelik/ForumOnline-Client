import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    allPosts: [],
}

const allPosts = createSlice({
    name: 'allPosts',
    initialState,
    reducers: {
        setAllPosts: (state, action) => {
            state.allPosts = action.payload
        },
        appendAllPosts: (state, action) => {
            state.allPosts = [...state.allPosts, action.payload]
        },
    }
});

export const { setAllPosts,appendAllPosts } = allPosts.actions
export default allPosts.reducer;