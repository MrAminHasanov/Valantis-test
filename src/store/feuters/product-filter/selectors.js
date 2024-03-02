import { createSelector } from "@reduxjs/toolkit";
import { name } from "./slice";

const stateSelector = (state) => state[name];

export const productActivePageSelector = createSelector(stateSelector, ({ activePage }) => activePage);
export const productPageCountSelector = createSelector(stateSelector, ({ pageCount }) => pageCount);
export const productFilterParamSelector = createSelector(stateSelector, ({ params }) => params);
export const brandsSelector = createSelector(stateSelector, ({ brands }) => brands);
export const brandsStatusSelector = createSelector(stateSelector, ({ brandsStatus }) => brandsStatus);