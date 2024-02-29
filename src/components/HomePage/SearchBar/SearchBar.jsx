import c from './SearchBar.module.scss';

import { useState } from 'react';

import { useProductsFilterActions } from '../../../store/feuters/product-filter/hook';
import { useProductsActions } from '../../../store/feuters/products';

function SearchBar() {
    const { setFilterParams } = useProductsFilterActions();
    const { startProductsUpdate } = useProductsActions();

    const [price, setPrice] = useState("");
    const [product, setProduct] = useState("");

    const [activeParamKey, setActiveParamKey] = useState("");

    const onPriceChange = (e) => {
        setProduct("");
        setPrice(Number(e.target.value));

        setActiveParamKey("price")
    }
    const onProductChange = (e) => {
        setPrice("");
        setProduct(e.target.value);

        setActiveParamKey("product")
    }

    const onHandleSearchClick = () => {
        const activeParam = price || product;

        setFilterParams(
            activeParam === ""
                ? null
                : { [activeParamKey]: activeParam }
        );
        startProductsUpdate();
    }

    return (
        <div className={c.component}>
            <input
                type='number'
                className={c.priceInput}
                onChange={onPriceChange}
                placeholder='Price'
                value={price} />
            <div className={c.brandDropDown}>
                {""}
            </div>
            <input
                type="text"
                className={c.nameInput}
                onChange={onProductChange}
                placeholder='Name'
                value={product} />
            <button className={c.searchButton} onClick={onHandleSearchClick}>поиск</button>
        </div>
    )
}

export default SearchBar