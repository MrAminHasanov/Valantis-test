import c from './BrandList.module.scss'

import { useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';

import { brandsSelector, brandsStatusSelector } from '../../../../../store/feuters/product-filter/selectors';
import { useProductsFilterActions } from '../../../../../store/feuters/product-filter/hook';

import BrandListElement from './BrandListElement/BrandListElement';
import DropDownLoader from './DropDownLoader/DropDownLoader';

import { paramKeys } from '../../SearchBar';
import { statusConst } from '../../../../../store/statusConstants';

function BrandList({ onParamChange, setIsDropDownActive, isDropDownActive }) {
    const { startBrandsLoading } = useProductsFilterActions();

    const brands = useSelector(brandsSelector);
    const status = useSelector(brandsStatusSelector);

    const brandElementHandleClick = useCallback((brand) => {
        onParamChange(brand, paramKeys.brand)
        setIsDropDownActive(false);
    }, [onParamChange, setIsDropDownActive])

    return (
        <ul
            className={c.component}
            style={{ maxHeight: isDropDownActive ? "170px" : "0px" }} >
            <BrandListElement
                brandElementHandleClick={brandElementHandleClick}
                brand={""} />
            {
                brands.map((brand, key) =>
                    <BrandListElement
                        key={key}
                        brandElementHandleClick={brandElementHandleClick}
                        brand={brand} />
                )
            }
            <li className={c.addBrand}>
                {
                    (
                        status === statusConst.idle ||
                        status === statusConst.loading ||
                        status === statusConst.serverError
                    )
                        ?
                        <DropDownLoader />
                        :
                        <button type="button" onClick={startBrandsLoading}>
                            Add more
                        </button>
                }
            </li>
        </ul >
    )
}

export default BrandList