import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducer as productsReducer, moduleName as productsState } from './feuters/products'
import { reducer as productFilterReducer, moduleName as productFilterState } from './feuters/product-filter'

const reducers = combineReducers({
    [productsState]: productsReducer,
    [productFilterState]: productFilterReducer
});

export const store = configureStore({
    reducer: reducers,
});

