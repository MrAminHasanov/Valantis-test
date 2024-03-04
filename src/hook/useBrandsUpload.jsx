import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { brandsStatusSelector } from "../store/feuters/product-filter/selectors";

import { useProductsFilterActions } from "../store/feuters/product-filter/hook";

import { statusConst } from "../store/statusConstants";

const useBrandsUpload = () => {
    const [brandsLoadingOffset, setBrandsLoadingOffset] = useState(0);

    const { addBrands } = useProductsFilterActions();
    const status = useSelector(brandsStatusSelector);

    useEffect(() => {
        (
            async () => {
                if (status === statusConst.loading ||
                    status === statusConst.error ||
                    status === statusConst.success)
                    return

                try {
                    await addBrands(brandsLoadingOffset);
                    setBrandsLoadingOffset(brandsLoadingOffset + 200);
                }
                catch (error) {
                    if (!isNaN(error)) {
                        console.error(error)
                    }
                }
            }
        )()
    }, [status, addBrands, setBrandsLoadingOffset, brandsLoadingOffset])
}

export default useBrandsUpload