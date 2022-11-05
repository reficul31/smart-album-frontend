import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '../features/search/searchSlice';
import uploadReducer from '../features/upload/uploadSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    upload: uploadReducer
  },
});
