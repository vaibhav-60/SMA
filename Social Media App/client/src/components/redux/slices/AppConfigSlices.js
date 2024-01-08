import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { axiosClient } from "../../../utils/axiosClient";

export const getMyInfo = createAsyncThunk('user/getMyInfo', async (_, thunkAPI) => {
    try {
        thunkAPI.dispatch(setLoading(true));
        const response = await axiosClient.get('user/getMyInfo')
        return response.result;
    } catch (e) {
        return Promise.reject(e);
    } finally {
        thunkAPI.dispatch(setLoading(false));
    }



})

export const updateMyProfile = createAsyncThunk('user/updateMyProfile', async (body, thunkAPI) => {
    try {
        thunkAPI.dispatch(setLoading(true));
        const response = await axiosClient.put('/user/', body)
        return response.result;
    } catch (e) {
        return Promise.reject(e);
    } finally {
        thunkAPI.dispatch(setLoading(false));
    }
})

const appConfigSlices = createSlice({
    name: "appConfigSlices",
    initialState: {
        isLoading: false,
        myProfile: null
    },

    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(getMyInfo.fulfilled, (state, action) => {
            state.myProfile = action.payload.user
        }).addCase(updateMyProfile.fulfilled, (state, action) => {
            state.myProfile = action.payload.user
        })
    }
})

export default appConfigSlices.reducer;

export const { setLoading } = appConfigSlices.actions;