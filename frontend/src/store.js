import {configureStore} from '@reduxjs/toolkit'
import { apiSlice } from './slices/apiSlice';
import cartSliceReducer from './slices/cartSlice';
import authSliceReducer from './slices/authSlice';

const store = configureStore({
    reducer: {
        // Define your reducers here (e.g., { counter: counterReducer })
        [apiSlice.reducerPath]: apiSlice.reducer,
        cart: cartSliceReducer,
        auth: authSliceReducer,  // Add your authslice 
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware), 
    devTools: true,
    // Add your middleware here

})

export default store;