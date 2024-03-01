import { createAsyncThunk } from "@reduxjs/toolkit";
import { productApi } from "../../../api/productApi";

export const getFieldsThunk = createAsyncThunk(
    'productFilter/getFields',
    async (userData, { rejectWithValue }) => {
        let response
        try {
            response = await productApi.getFields(userData);
            const data = await response.json();
            return data.result
        }
        catch (error) {
            return rejectWithValue(response.status)
        }
    }
)
