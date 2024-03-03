import { name } from "./slice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { productApi } from "../../../api/productApi";

export const getIdsThunk = createAsyncThunk(
    `${name}/getIds`, (userData, { rejectWithValue }) =>
    thunkFunct(userData, rejectWithValue, productApi.getIds));

export const getProductsThunk = createAsyncThunk(
    `${name}/getProducts`, (userData, { rejectWithValue }) =>
    thunkFunct(userData, rejectWithValue, productApi.getProducts));

export const getFilteredProductsIdsThunk = createAsyncThunk(
    `${name}/getFilteredProductsIds`, (userData, { rejectWithValue }) =>
    thunkFunct(userData, rejectWithValue, productApi.getFilteredProductsIds));

const thunkFunct = async (userData, rejectWithValue, apiFunct) => {
    let response
    try {
        response = await apiFunct(userData);
        const data = await response.json();
        return data.result
    }
    catch (error) {
        console.error(error);
        return rejectWithValue(response?.status ?? error)
    }
};