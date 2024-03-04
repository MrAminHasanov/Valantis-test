import { useEffect } from "react";

import { productActivePageSelector, productFilterParamSelector } from '../store/feuters/product-filter/selectors';
import { useSelector } from "react-redux";
import { productsStatusSelector, useProductsActions } from "../store/feuters/products";

import { statusConst } from '../store/statusConstants';


const useProductsUpload = () => {
    const status = useSelector(productsStatusSelector);

    const activePage = useSelector(productActivePageSelector);
    const filterParam = useSelector(productFilterParamSelector);

    const { getIds, startProductsUpload } = useProductsActions();

    useEffect(() => {
        if (!(
            status === statusConst.serverError ||
            status === statusConst.idle ||
            status === statusConst.startUpdate
        ))
            return
        (async () => {
            try {
                const ids = await getIds(activePage, filterParam);
                await startProductsUpload(ids);
            } catch (error) {
                if (!isNaN(error)) {
                    console.error(error)
                }
            }
        })()
    },
        [
            getIds, startProductsUpload,
            status, activePage, filterParam
        ]
    )
}

export default useProductsUpload