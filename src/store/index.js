import { configureStore } from '@reduxjs/toolkit'
import auth from './auth'
import allPosts from './allPosts'
import myPosts from './myPosts'
import favoritePosts from './favoritePosts'
import complaints from './complaints'

const store = configureStore({
    reducer: {
        auth,
        allPosts,
        myPosts,
        favoritePosts,
        complaints
    }
})

export default store;