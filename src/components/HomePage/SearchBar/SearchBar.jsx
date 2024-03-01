import c from './SearchBar.module.scss';

import { useState } from 'react';

import { useProductsFilterActions } from '../../../store/feuters/product-filter/hook';
import { useProductsActions } from '../../../store/feuters/products';
import BrandDropDown from './BrandDropDown/BrandDropDown';

function SearchBar() {
    const { setFilterParams } = useProductsFilterActions();
    const { startProductsUpdate } = useProductsActions();

    const [price, setPrice] = useState("");
    const [product, setProduct] = useState("");
    const [brand, setBrand] = useState("");

    const [activeParamKey, setActiveParamKey] = useState("");

    const onPriceChange = (e) => {
        setBrand("");
        setProduct("");
        setPrice(Number(e.target.value));

        setActiveParamKey("price");
    }

    const onBrandClick = (brand) => {
        setProduct("");
        setPrice("");
        setBrand(brand);

        setActiveParamKey("brand");
    }

    const onProductChange = (e) => {
        setPrice("");
        setBrand("");
        setProduct(e.target.value);

        setActiveParamKey("product");
    }

    const onHandleSearchClick = () => {
        const activeParam = price || product || brand;

        setFilterParams(
            activeParam === ""
                ? null
                : { [activeParamKey]: activeParam }
        );

        startProductsUpdate();
    }

    return (
        <div className={c.component}>
            <BrandDropDown activeBrand={brand} setBrand={onBrandClick} />
            <input
                type='number'
                className={c.priceInput}
                onChange={onPriceChange}
                placeholder='Цена'
                min={0}
                value={price} />
            <input
                type="text"
                className={c.nameInput}
                onChange={onProductChange}
                placeholder='Названия'
                value={product} />
            <button className={c.searchButton} onClick={onHandleSearchClick}>поиск</button>
        </div>
    )
}

export default SearchBar