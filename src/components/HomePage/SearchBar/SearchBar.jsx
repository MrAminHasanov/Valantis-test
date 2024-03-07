import c from './SearchBar.module.scss';

import { useSelector } from 'react-redux';

import { productFilterParamSelector } from '../../../store/feuters/product-filter/selectors';
import { useProductsFilterActions } from '../../../store/feuters/product-filter/hook';
import { useProductsActions } from '../../../store/feuters/products';

import BrandDropDown from './BrandDropDown/BrandDropDown';

export const paramKeys = { price: "price", brand: "brand", product: "product" }

function SearchBar() {
    const filterParam = useSelector(productFilterParamSelector);

    const { setFilterParams, setPageIndex } = useProductsFilterActions();
    const { setProductsUpdateStatus } = useProductsActions();

    const onParamChange = (newParam, newParamKey) => {
        setFilterParams({ [newParamKey]: newParam });
    }

    const onSearchSubmit = (e) => {
        e.preventDefault();
        setPageIndex(1);
        setProductsUpdateStatus();
    }

    return (
        <form className={c.component} onSubmit={onSearchSubmit}>
            <BrandDropDown onParamChange={onParamChange} filterParam={filterParam} />
            <input
                type='number'
                className={c.priceInput}
                onChange={(e) => onParamChange(Number(e.target.value), paramKeys.price)}
                placeholder='Цена'
                min={0}
                value={filterParam[paramKeys.price] ?? 0} />
            <input
                type="text"
                className={c.nameInput}
                onChange={(e) => onParamChange(e.target.value, paramKeys.product)}
                placeholder='Названия'
                value={filterParam[paramKeys.product] ?? ""} />
            <button className={c.searchButton} type="submit">поиск</button>
        </form>
    )
}

export default SearchBar
