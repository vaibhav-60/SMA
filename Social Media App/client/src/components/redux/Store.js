import { configureStore } from "@reduxjs/toolkit";
import AppConfigReducer from "./slices/AppConfigSlices";
import postsReducer from './slices/PostSlice'
import feedDataReducer from "./slices/feedSlice";

export default configureStore({
    reducer: {
        AppConfigReducer,
        postsReducer,
        feedDataReducer
    }
})