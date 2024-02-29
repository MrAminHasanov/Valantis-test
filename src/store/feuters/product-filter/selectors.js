import { moduleName } from "./slice";

export const productActivePageSelector = ((state) => state[moduleName].activePage);
export const productPageCountSelector = ((state) => state[moduleName].pageCount);
export const productFilterParamSelector = ((state) => state[moduleName].params);