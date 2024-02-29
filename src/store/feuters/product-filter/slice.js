import { createSlice } from "@reduxjs/toolkit";

export const moduleName = "productFilter";

const initialState = {
    pageCount: "unlimited",
    activePage: 1,
    params: null
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
        }
    },
})

export const { reducer, actions } = productsSlice;
