import { createSlice } from "@reduxjs/toolkit";
import { getIdsThunk, getProductsThunk, getFilteredProductsIdsThunk } from "./thunks"

export const moduleName = "products";

const initialState = {
    products: [],
    status: "idle",
}

const productsSlice = createSlice({
    name: moduleName,
    initialState,
    reducers: {
        setProducts: (state, { payload }) => {
            state.products = payload;
        },
        setStatus: (state, { payload }) => {
            state.status = payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getIdsThunk.pending, state => {
                state.status = "loading";
            })
            .addCase(getFilteredProductsIdsThunk.pending, state => {
                state.status = "loading";
            })

            .addCase(getIdsThunk.rejected, thunkRejection)
            .addCase(getFilteredProductsIdsThunk.rejected, thunkRejection)
            .addCase(getProductsThunk.rejected, thunkRejection)

            .addCase(getProductsThunk.fulfilled, state => {
                state.status = "success"
            })
    }
})

export const { reducer, actions } = productsSlice;

const thunkRejection = (state, { payload }) => {
    if (payload >= 500) {
        state.status = "serverError"
    } else {
        state.status = "error"
    }
}