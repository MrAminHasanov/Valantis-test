import { createSlice } from "@reduxjs/toolkit";
import { getIdsThunk, getProductsThunk, getFilteredProductsIdsThunk } from "./thunks"

import { statusConst } from "../../statusConstants";

const initialState = {
    products: [],
    status: statusConst.idle,
}

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setStatus: (state, { payload }) => {
            state.status = payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getIdsThunk.pending, state => {
                state.status = statusConst.loading;
            })
            .addCase(getFilteredProductsIdsThunk.pending, state => {
                state.status = statusConst.loading;
            })

            .addCase(getIdsThunk.rejected, thunkRejection)
            .addCase(getFilteredProductsIdsThunk.rejected, thunkRejection)
            .addCase(getProductsThunk.rejected, thunkRejection)

            .addCase(getFilteredProductsIdsThunk.fulfilled, (state, { payload: ids }) => {
                if (ids.length === 0) {
                    state.status = statusConst.productNotFounded;
                    console.error(statusConst.productNotFounded);
                }
            })
            .addCase(getProductsThunk.fulfilled, (state, { payload: products }) => {
                const productsIds = products.map(({ id }) => id);
                const uniqueIds = new Set(productsIds);

                const uniqueProducts = products.filter(({ id }) => {
                    if (uniqueIds.has(id)) {
                        uniqueIds.delete(id)
                        return true
                    }
                    return false
                })

                state.products = uniqueProducts;
                state.status = statusConst.success
            })
    }
})

export const { reducer, actions, name } = productsSlice;

const thunkRejection = (state, { payload }) => {
    if (!isNaN(payload) && payload === 500) {
        state.status = statusConst.serverError
    } else {
        state.status = statusConst.error
    }
}