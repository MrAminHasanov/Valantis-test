import { moduleName } from "./slice";

export const productsSelector = ((state) => state[moduleName].products);
export const productsStatusSelector = ((state) => state[moduleName].status);