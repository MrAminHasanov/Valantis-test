import c from "./BrandDropDown.module.scss"

import { useState } from "react";

import { paramKeys } from "../SearchBar";

import BrandList from "./BrandList/BrandList";
import useBrandsUpload from '../../../../hook/useBrandsUpload';


function BrandDropDown({ onParamChange, filterParam }) {
    const [isDropDownActive, setIsDropDownActive] = useState(false);

    const activeBrand = filterParam[paramKeys.brand];

    const activeBrandHandleClick = () => setIsDropDownActive(!isDropDownActive);

    useBrandsUpload()

    return (
        <div className={c.component}>
            <button onClick={activeBrandHandleClick} type="button" className={c.activeBrand}>
                {
                    activeBrand === null
                        ? "not branded"
                        : activeBrand || "Все"
                }
            </button>
            <BrandList
                onParamChange={onParamChange}
                setIsDropDownActive={setIsDropDownActive}
                isDropDownActive={isDropDownActive} />
        </div >
    )
}

export default BrandDropDown