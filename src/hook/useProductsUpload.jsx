import { useEffect } from "react";

import { productActivePageSelector, productFilterParamSelector } from '../store/feuters/product-filter/selectors';
import { useSelector } from "react-redux";
import { productsStatusSelector, useProductsActions } from "../store/feuters/products";

import { statusConst } from '../store/statusConstants';


const useProductsUpload = () => {
    const status = useSelector(productsStatusSelector);

    const activePage = useSelector(productActivePageSelector);
    const productFilterParam = useSelector(productFilterParamSelector);

    const { getFilteredProductsIds, getIds, startProductsUpload } = useProductsActions();

    useEffect(() => {
        if (!(
            status === statusConst.serverError ||
            status === statusConst.idle ||
            status === statusConst.startUpdate
        ))
            return
        (async () => {
            try {
                const isFilterActive = productFilterParam !== null;
                const ids =
                    isFilterActive
                        ? await getFilteredProductsIds(activePage - 1, productFilterParam)
                        : await getIds(activePage - 1);

                await startProductsUpload(ids);
            } catch (error) {
                if (!isNaN(error)) {
                    console.error(error)
                }
            }
        })()
    },
        [getIds, startProductsUpload, getFilteredProductsIds,
            status, activePage, productFilterParam])
}

export default useProductsUpload