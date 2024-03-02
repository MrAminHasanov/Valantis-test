import { useSelector } from "react-redux"
import c from "./BrandDropDown.module.scss"
import { brandsSelector, brandsStatusSelector } from "../../../../store/feuters/product-filter/selectors"
import { useProductsFilterActions } from "../../../../store/feuters/product-filter/hook";
import { useEffect, useState } from "react";
import DropDownLoader from "./DropDownLoader/DropDownLoader";

function BrandDropDown({ activeBrand, setBrand }) {
    const [brandsLoadingOffset, setBrandsLoadingOffset] = useState(0);
    const [isDropDownActive, setIsDropDownActive] = useState(false);

    const brands = useSelector(brandsSelector);
    const status = useSelector(brandsStatusSelector);

    const { startBrandsLoading, addBrands } = useProductsFilterActions();

    useEffect(() => {
        (
            async () => {
                if (status === "loading" ||
                    status === "error" ||
                    status === "success") {
                    return
                }
                try {
                    await addBrands(brandsLoadingOffset, brands);
                    setBrandsLoadingOffset(brandsLoadingOffset + 200);
                }
                catch (error) {
                    if (!isNaN(error)) {
                        console.error(error)
                    }
                }
            }
        )()
    }, [status, addBrands, setBrandsLoadingOffset, brandsLoadingOffset, brands])

    const activeBrandHandleClick = () => setIsDropDownActive(!isDropDownActive);
    const brandElementHandleClick = (brand) => {
        setBrand(brand);
        setIsDropDownActive(false);
    }

    return (
        <div className={c.component}>
            <button onClick={activeBrandHandleClick} className={c.activeBrand}>
                {
                    activeBrand === null
                        ? "not branded"
                        : activeBrand || "Все"
                }
            </button>

            <ul className={c.brandList} style={{ maxHeight: isDropDownActive ? "170px" : "0px" }} >
                <li className={c.brandElement}>
                    <button onClick={() => brandElementHandleClick("")}>
                        {"All"}
                    </button>
                </li>
                {
                    brands.map((brand, i) =>
                        <li key={i} className={c.brandElement}>
                            <button onClick={() => brandElementHandleClick(brand)}>
                                {brand || "not branded"}
                            </button>
                        </li>
                    )
                }
                <li className={c.addBrandList}>
                    {
                        (
                            status === "idle" ||
                            status === "loading" ||
                            status === "serverError"
                        )
                            ? <DropDownLoader />
                            :
                            <button onClick={() => startBrandsLoading()}>
                                Add more
                            </button>
                    }
                </li>
            </ul >
        </div >
    )
}

export default BrandDropDown