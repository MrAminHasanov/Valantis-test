import c from './SearchBar.module.scss';

import { useState } from 'react';

import { useProductsFilterActions } from '../../../store/feuters/product-filter/hook';
import { useProductsActions } from '../../../store/feuters/products';
import BrandDropDown from './BrandDropDown/BrandDropDown';
import useBrandsUpload from '../../../hook/useBrandsUpload';

export const paramKeys = { price: "price", brand: "brand", product: "product" }

function SearchBar() {
    const { setFilterParams, setPageIndex } = useProductsFilterActions();
    const { setProductsUpdateStatus } = useProductsActions();

    const [activeParam, setActiveParam] = useState("");
    const [activeParamKey, setActiveParamKey] = useState("");

    const getValue = (paramKey, defaultValue) =>
        activeParamKey === paramKey
            ? activeParam
            : defaultValue;

    const onParamChange = (newActiveParam, newActiveParamKey) => {
        setActiveParam(newActiveParam);
        setActiveParamKey(newActiveParamKey);
    }

    const onSearchSubmit = (e) => {
        e.preventDefault();

        setFilterParams(
            activeParam === ""
                ? null
                : { [activeParamKey]: activeParam }
        );

        setActiveParam("");
        setActiveParamKey("");
        setPageIndex(1);
        setProductsUpdateStatus();
    }

    useBrandsUpload()

    return (
        <form className={c.component} onSubmit={onSearchSubmit}>
            <BrandDropDown getValue={getValue} onParamChange={onParamChange} />
            <input
                type='number'
                className={c.priceInput}
                onChange={(e) => onParamChange(Number(e.target.value), paramKeys.price)}
                placeholder='Цена'
                min={0}
                value={getValue(paramKeys.price, 0)} />
            <input
                type="text"
                className={c.nameInput}
                onChange={(e) => onParamChange(e.target.value, paramKeys.product)}
                placeholder='Названия'
                value={getValue(paramKeys.product, "")} />
            <button className={c.searchButton} type="submit">поиск</button>
        </form>
    )
}

export default SearchBar
