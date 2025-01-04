import {configureStore} from '@reduxjs/toolkit'
import { apiSlice } from './slices/apiSlice';

const store = configureStore({
    reducer: {
        // Define your reducers here (e.g., { counter: counterReducer })
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware), 
    devTools: true,
    // Add your middleware here

})

export default store;