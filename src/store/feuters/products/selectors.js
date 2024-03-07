import { createSelector } from "@reduxjs/toolkit";
import { name } from "./slice";

const stateSelector = (store) => store[name];

export const productsSelector = createSelector(stateSelector, ({ products }) => products);
export const productsStatusSelector = createSelector(stateSelector, ({ status }) => status);
export const productsStatusMessageSelector = createSelector(stateSelector, ({ statusMessage }) => statusMessage);
