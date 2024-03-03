import c from "./BrandDropDown.module.scss"

import { useSelector } from "react-redux"
import { useEffect, useState } from "react";

import { brandsSelector, brandsStatusSelector } from "../../../../store/feuters/product-filter/selectors"
import { useProductsFilterActions } from "../../../../store/feuters/product-filter/hook";

import DropDownLoader from "./DropDownLoader/DropDownLoader";

import { statusConst } from "../../../../store/statusConstants";

function BrandDropDown({ activeBrand, setBrand }) {
    const [brandsLoadingOffset, setBrandsLoadingOffset] = useState(0);
    const [isDropDownActive, setIsDropDownActive] = useState(false);

    const brands = useSelector(brandsSelector);
    const status = useSelector(brandsStatusSelector);

    const { startBrandsLoading, addBrands } = useProductsFilterActions();

    useEffect(() => {
        (
            async () => {
                if (status === statusConst.loading ||
                    status === statusConst.error ||
                    status === statusConst.success) {
                    return
                }
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

    const activeBrandHandleClick = () => setIsDropDownActive(!isDropDownActive);
    const brandElementHandleClick = (brand) => {
        setBrand(brand);
        setIsDropDownActive(false);
    }

    return (
        <div className={c.component}>
            <button onClick={activeBrandHandleClick} type="button" className={c.activeBrand}>
                {
                    activeBrand === null
                        ? "not branded"
                        : activeBrand || "Все"
                }
            </button>

            <ul className={c.brandList} style={{ maxHeight: isDropDownActive ? "170px" : "0px" }} >
                <li className={c.brandElement}>
                    <button type="button" onClick={() => brandElementHandleClick("")}>
                        {"All"}
                    </button>
                </li>
                {
                    brands.map((brand, i) =>
                        <li key={i} className={c.brandElement}>
                            <button type="button" onClick={() => brandElementHandleClick(brand)}>
                                {brand || "not branded"}
                            </button>
                        </li>
                    )
                }
                <li className={c.addBrandList}>
                    {
                        (
                            status === statusConst.idle ||
                            status === statusConst.loading ||
                            status === statusConst.serverError
                        )
                            ? <DropDownLoader />
                            :
                            <button type="button" onClick={() => startBrandsLoading()}>
                                Add more
                            </button>
                    }
                </li>
            </ul >
        </div >
    )
}

export default BrandDropDown