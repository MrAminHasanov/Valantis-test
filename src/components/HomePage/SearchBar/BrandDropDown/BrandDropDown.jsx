import c from "./BrandDropDown.module.scss"

import { useSelector } from "react-redux"
import { useState } from "react";

import { brandsSelector, brandsStatusSelector } from "../../../../store/feuters/product-filter/selectors"
import { useProductsFilterActions } from "../../../../store/feuters/product-filter/hook";

import DropDownLoader from "./DropDownLoader/DropDownLoader";

import { statusConst } from "../../../../store/statusConstants";

import { paramKeys } from "../SearchBar";
import BrandButton from "./BrandButton/BrandButton";

function BrandDropDown({ onParamChange, getValue }) {
    const [isDropDownActive, setIsDropDownActive] = useState(false);

    const brands = useSelector(brandsSelector);
    const status = useSelector(brandsStatusSelector);

    const activeBrand = getValue(paramKeys.brand, "");

    const { startBrandsLoading } = useProductsFilterActions();

    const activeBrandHandleClick = () => setIsDropDownActive(!isDropDownActive);
    const brandElementHandleClick = (brand) => {
        onParamChange(brand, paramKeys.brand)
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
            <ul
                className={c.brandList}
                style={{ maxHeight: isDropDownActive ? "170px" : "0px" }} >
                <BrandButton
                    brandElementHandleClick={() => brandElementHandleClick("")}
                    buttonContent={"All"} />
                {
                    brands.map((brand, i) =>
                        <BrandButton
                            key={i}
                            brandElementHandleClick={() => brandElementHandleClick(brand)}
                            buttonContent={brand || "not branded"} />
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