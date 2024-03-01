import { createSlice } from "@reduxjs/toolkit";
import { getIdsThunk, getProductsThunk, getFilteredProductsIdsThunk } from "./thunks"

export const moduleName = "products";

const initialState = {
    products: 
    [{ "brand": null, "id": "1789ecf3-f81c-4f49-ada2-83804dcc74b0", "price": 16700, "product": "Золотое кольцо с бриллиантами" }, { "brand": null, "id": "2b7c7643-6852-4562-8a72-7666c72b3518", "price": 12500, "product": "Золотое кольцо с топазом и бриллиантами" }, { "brand": null, "id": "9f2722a8-dac6-4f71-b877-1731d30ae6db", "price": 8500, "product": "Золотое кольцо с бриллиантами и изумрудом" }, { "brand": null, "id": "6543564e-ccc0-46f4-9af9-ab2d4bb16451", "price": 26600, "product": "Золотое колье с бриллиантами и ониксом Pasquale Bruni" }, { "brand": null, "id": "da6e21f9-3fa9-4fd0-bdd7-91d3399236a1", "price": 34440, "product": "Золотое кольцо с бриллиантами и жемчугом" }, { "brand": "Piaget", "id": "91a4056d-462d-4469-b97d-1d442d1e2fbc", "price": 23363, "product": "Золотое колье с рубинами и бриллиантами" }, { "brand": null, "id": "00d56be6-b59e-4ac2-a98b-4bfad34241c4", "price": 159800, "product": "Золотые серьги с бриллиантами и сапфирами" }, { "brand": null, "id": "096cdfe7-d54d-4f97-9866-59558962260d", "price": 74600, "product": "Золотые серьги с бриллиантами" }, { "brand": null, "id": "e9e80af7-9ca7-497d-90b8-fbfeb4d085ba", "price": 63000, "product": "Золотое кольцо с бриллиантами и гранатом" }, { "brand": null, "id": "611eb9c1-52a4-4a18-9e16-f0933cdf0b30", "price": 90000, "product": "Золотые серьги с бриллиантами и  Аметистами" }, { "brand": "Jacob & Co", "id": "18e4e3bd-5e60-4348-8c92-4f61c676be1f", "price": 52400, "product": "Золотое кольцо с бриллиантом" }, { "brand": null, "id": "711837ec-57f6-4145-b17f-c74c2896bafe", "price": 4500, "product": "Золотое кольцо с бриллиантами" }, { "brand": null, "id": "6c972a4a-5b91-4a98-9780-3a19a7f41560", "price": 55000, "product": "Золотой браслет с бриллиантами и аметистами" }, { "brand": null, "id": "a71d4c3a-33cf-4d63-ae29-f5f2f154ba85", "price": 17280, "product": "Золотое кольцо с бриллиантами и сапфиром" }, { "brand": null, "id": "15cf0d0e-047c-4e61-9b26-4566345bdece", "price": 16800, "product": "Золотое кольцо с дымчатым кварцем" }, { "brand": null, "id": "822ae5e8-2c84-4f00-a748-7fad53c4ca97", "price": 22500, "product": "Золотое кольцо с бриллиантом" }, { "brand": null, "id": "0d51bedf-5b5b-4e28-adcf-16a156c400b8", "price": 40000, "product": "Золотое кольцо с бриллиантами" }, { "brand": null, "id": "17a4da41-5eb3-4c0f-be67-c58b0b5af978", "price": 26000, "product": "Золотое кольцо с бриллиантами и сапфиром" }, { "brand": null, "id": "9457b12c-470a-41c9-8498-05c398127e5c", "price": 105000, "product": "Золотой комплект с аметистами и хризолитом" }, { "brand": null, "id": "781013e8-7048-4774-9e92-badbaf46b0e7", "price": 10000, "product": "Золотое кольцо с бриллиантами" }, { "brand": null, "id": "f260313d-9fb2-44d8-8f4a-41f731463df9", "price": 35000, "product": "Комплект с изумрудами и бриллиантами Русские самоцветы" }, { "brand": null, "id": "2c81492a-0fe8-436c-bddf-0c892592b31e", "price": 45000, "product": "Золотые серьги с бриллиантами  бирюзой и сапфирами" }, { "brand": null, "id": "d0e96be0-ce1d-45ea-bb33-6bfa68866475", "price": 135000, "product": "Золотое кольцо с бриллиантами" }, { "brand": null, "id": "e8c1d828-056e-4584-833b-de5e965d94bd", "price": 21000, "product": "Золотое кольцо с бриллиантами" }, { "brand": null, "id": "9632ea03-a8b4-476d-9b3c-2a9ae7234d41", "price": 30000, "product": "Антикварная серебряная ложка" }, { "brand": null, "id": "58a3eff4-e06d-468d-9130-d3092a2574a5", "price": 250000, "product": "Золотые серьги СССР  с бриллиантами" }, { "brand": null, "id": "00abbb13-9102-472e-8b50-b1c55202dfa7", "price": 23000, "product": "Золотой кулон с бриллиантами и изумрудами" }, { "brand": null, "id": "d638441c-3334-4e83-a5ed-21bf204ca83b", "price": 8500, "product": "Золотой кулон с аметистом и топазами" }, { "brand": null, "id": "2debd89d-8154-4111-8eab-fe7e4de15a00", "price": 150000, "product": "Золотое кольцо с бриллиантами" }, { "brand": null, "id": "578df1b1-3fbd-4edc-9dee-46de8b272da1", "price": 17280, "product": "Золотое кольцо с рубинами и бриллиантами" }, { "brand": null, "id": "aa657c80-39fe-4144-858e-e271982c0741", "price": 285000, "product": "Золотые серьги с топазами и гранатами" }, { "brand": null, "id": "7b375bd9-361d-4cb5-9106-a95a780049a0", "price": 110000, "product": "Золотое кольцо с бриллиантами" }, { "brand": null, "id": "172ca094-8083-4a29-b271-5b21942bd768", "price": 23500, "product": "Золотое кольцо с изумрудом и бриллиантами" }, { "brand": null, "id": "86fe3827-f052-41b7-b052-093b98a21589", "price": 310000, "product": "Золотое кольцо с бриллиантами" }, { "brand": null, "id": "56a0dfa0-c573-4a51-958a-d2d79545de28", "price": 21500, "product": "Золотое кольцо с бриллиантами" }, { "brand": null, "id": "d98ff64f-c4aa-4737-9888-41f671d1ee28", "price": 23426, "product": "Золотое кольцо с бриллиантами и  самоцветами" }, { "brand": null, "id": "ba946a1e-7cf8-4bbe-9ae6-47045416b262", "price": 10000, "product": "Золотые серьги с бриллиантами" }, { "brand": null, "id": "59a9b5b4-6546-417f-9c0a-7ec1b9385af1", "price": 17500, "product": "Золотое кольцо с самоцветами" }, { "brand": null, "id": "221d761a-705e-4995-8051-b121c7cb816a", "price": 88000, "product": "Золотое кольцо с бриллиантами и сапфиром" }, { "brand": "Cartier", "id": "efbed366-5d22-4bce-817c-71cea4524348", "price": 16900, "product": "Золотая брошь с жемчугом" }, { "brand": null, "id": "cb02fb80-151c-48aa-9ef1-426d816ec1d1", "price": 55300, "product": "Золотое колье с бриллиантами" }, { "brand": null, "id": "a81c6e7a-f4ae-4c1b-8bbd-cd14b23d65a1", "price": 48000, "product": "Золотое кольцо с Жадеитом и бриллиантами" }, { "brand": null, "id": "c4e31c89-8784-496c-8800-4049ff557097", "price": 90000, "product": "Золотые серьги с бриллиантами" }, { "brand": null, "id": "f8847c89-4c9d-43cf-86bf-b57c8d529d1f", "price": 32000, "product": "Золотое кольцо с изумрудом" }, { "brand": null, "id": "85da31db-beab-4423-b6cc-3958f752ba55", "price": 175800, "product": "Золотые серьги с цветными фианитами" }, { "brand": null, "id": "68202985-ceaa-4a53-b232-0efa67f64f96", "price": 75000, "product": "Золотое кольцо с бриллиантами" }, { "brand": null, "id": "031b7fa3-e1ca-4ada-8b7c-4a037a2ca90b", "price": 29120, "product": "Золотое кольцо с бриллиантами" }, { "brand": null, "id": "2884afe0-7d4a-4774-a316-53f8a2eb325b", "price": 163800, "product": "Золотое кольцо с бриллиантами" }, { "brand": null, "id": "95bd020c-b646-42d6-9e4f-e4dcc5f32f9f", "price": 30000, "product": "Золотое кольцо с бриллиантами" }, { "brand": null, "id": "7906ca89-2c3f-402b-8908-01caba95bd07", "price": 27500, "product": "Золотые серьги с бриллиантами" }],
    // [],
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