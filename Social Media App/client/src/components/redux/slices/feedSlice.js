import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { axiosClient } from "../../../utils/axiosClient";
import { setLoading } from "./AppConfigSlices";
import { likeAndUnlikePost } from "./PostSlice";

export const getFeedData = createAsyncThunk('user/getFeedData', async () => {
    try {
        const response = await axiosClient.get('user/getFeedData')
        return response.result;
    } catch (e) {
        return Promise.reject(e);
    }
}

);


export const followAndUnfollowUser = createAsyncThunk('user/followAndUnfollowUser', async (body, thunkAPI) => {
    try {
        thunkAPI.dispatch(setLoading(true));
        const response = await axiosClient.post('user/follow', body);
        return response.result.user;
    } catch (error) {
        return Promise.reject(error)
    }
    finally {
        thunkAPI.dispatch(setLoading(false));
    }

})


const feedSlice = createSlice({
    name: "feedSlice",
    initialState: {
        feedData: {}
    },


    extraReducers: (builder) => {
        builder.addCase(getFeedData.fulfilled, (state, action) => {
            state.feedData = action.payload;
        })
            .addCase(likeAndUnlikePost.fulfilled, (state, action) => {
                const post = action.payload;
                const index = state?.userProfile?.posts?.findIndex((item) => item._id == post._id);
                if (index != undefined && index != -1) {
                    state.userProfile.posts[index].isLiked = post;
                }
            })
            .addCase(followAndUnfollowUser.fulfilled, (state, action) => {
                const user = action.payload
                const index = state?.feedData?.followings.findIndex(item => item._id == user._id);
                if (index != -1) {
                    state?.feedData.followings.splice(index, 1);
                }
                else {
                    state?.feedData.followings.push(user);
                }
            })
    }
})

export default feedSlice.reducer;

