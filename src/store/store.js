import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducer as productsReducer, name as productsState } from './feuters/products'
import { reducer as productFilterReducer, name as productFilterState } from './feuters/product-filter'

const reducers = combineReducers({
    [productsState]: productsReducer,
    [productFilterState]: productFilterReducer
});

export const store = configureStore({
    reducer: reducers,
});

