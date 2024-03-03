import { createSelector } from "@reduxjs/toolkit";
import { name } from "./slice";

const stateSelector = (state) => state[name];

export const productsSelector = createSelector(stateSelector, ({ products }) => products);
export const productsStatusSelector = createSelector(stateSelector, ({ status }) => status);
export const productsStatusMessageSelector = createSelector(stateSelector, ({ statusMessage }) => statusMessage);
