import { createSlice } from "@reduxjs/toolkit";
import { getFieldsThunk } from "./thunks";

export const moduleName = "productFilter";

const initialState = {
    pageCount: "unlimited",
    activePage: 1,
    params: null,
    brandsStatus: "idle",
    brands: []
}

const productsSlice = createSlice({
    name: moduleName,
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
        addBrands: (state, { payload }) => {
            state.brands = payload;
        },
        setBrandsStatus: (state, { payload }) => {
            state.brandsStatus = payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getFieldsThunk.pending, state => {
                state.brandsStatus = "loading"
            })
            .addCase(getFieldsThunk.fulfilled, state => {
                state.brandsStatus = "success"
            })
            .addCase(getFieldsThunk.rejected, (state, { payload }) => {
                if (payload >= 500) {
                    state.brandsStatus = "serverError"
                } else {
                    state.brandsStatus = "error"
                }
            })
    }
})

export const { reducer, actions } = productsSlice;
