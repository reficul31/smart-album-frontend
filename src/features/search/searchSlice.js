import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { search } from '../../apiClient';

const initialState = {
    searchText: '',
    photoObjects: [],
    status:  'idle'
};

export const queryAsync = createAsyncThunk(
    'search/queryAsync',
    async (searchText) => {
        const response = await search(searchText);
        return response.data;
    }
);

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchText: (state, action) => {
            state.searchText = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(queryAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(queryAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.photoObjects = action.payload['results'];
            });
    },
});

export const { setSearchText } = searchSlice.actions;

export const selectStatus = (state) => state.search.status;
export const selectSearchText = (state) => state.search.searchText;
export const selectPhotoObjects = (state) => state.search.photoObjects;

export default searchSlice.reducer;