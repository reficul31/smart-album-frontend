import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { upload } from '../../apiClient';

const initialState = {
    status:  'idle'
};

export const queryAsync = createAsyncThunk(
    'upload/queryAsync',
    async (data) => {
        const { file, customLabels } = data;
        const fileBuffer = await file.arrayBuffer();
        const response = await upload({
            'key': file.name,
            'bucket': 'sb4539-hw2-photos',
            'Content-Type': file.type,
            'x-amz-meta-customLabels': customLabels.join(",")
        }, fileBuffer);
        return response.data;
    }
);

export const uploadSlice = createSlice({
    name: 'upload',
    initialState,
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(queryAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(queryAsync.fulfilled, (state, action) => {
                state.status = 'idle';
            });
    },
});

export const { setStatus } = uploadSlice.actions;

export const selectStatus = (state) => state.upload.status;

export default uploadSlice.reducer;