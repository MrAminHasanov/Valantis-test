import { createSlice } from "@reduxjs/toolkit";
import { getFieldsThunk } from "./thunks";

import { statusConst } from "../../statusConstants";

const initialState = {
    pageCount: 160,
    activePage: 1,
    params: null,
    brandsStatus: statusConst.idle,
    brands: []
}

const productsSlice = createSlice({
    name: "productFilter",
    initialState,
    reducers: {
        setActivePage: (state, { payload }) => {
            state.activePage = payload;
        },
        setFilterParams: (state, { payload }) => {
            state.params = payload;
        },
        setPageCount: (state, { payload }) => {
            state.pageCount = payload;
        },
        setBrandsStatus: (state, { payload }) => {
            state.brandsStatus = payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getFieldsThunk.pending, state => {
                state.brandsStatus = statusConst.loading;
            })
            .addCase(getFieldsThunk.fulfilled, (state, { payload: newBrands }) => {
                const curentBrands = state.brands;

                const allBrands = curentBrands.concat(newBrands);
                const allSortedBrands = new Set(allBrands);

                state.brands = Array.from(allSortedBrands);
                state.brandsStatus = statusConst.success;
            })
            .addCase(getFieldsThunk.rejected, (state, { payload }) => {
                if (payload >= 500) {
                    state.brandsStatus = statusConst.serverError;
                } else {
                    state.brandsStatus = statusConst.error;
                }
            })
    }
})

export const { reducer, actions, name } = productsSlice;
