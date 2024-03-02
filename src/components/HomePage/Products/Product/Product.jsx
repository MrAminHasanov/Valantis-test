import c from "./Product.module.scss";

import { useProductsActions } from "../../../../store/feuters/products"
import { useProductsFilterActions } from "../../../../store/feuters/product-filter"

function Product({ props: { id, brand, price, product } }) {

    const { setFilterParams,setPageIndex } = useProductsFilterActions();
    const { startProductsUpdate } = useProductsActions();

    const handleProductClick = () => {
        setFilterParams({ product });
        setPageIndex(1);
        startProductsUpdate();
    }
    const handleBrandClick = () => {
        setFilterParams({ brand });
        setPageIndex(1);
        startProductsUpdate();
    }
    const handlePriceClick = () => {
        setFilterParams({ price });
        setPageIndex(1);
        startProductsUpdate();
    }

    return (
        <div className={c.component}>
            <button onClick={handleProductClick}>
                <p>Продкут: {product}.</p>
            </button>
            <br />
            <p className={c.id}>ИД: {id}</p>
            <button onClick={handleBrandClick}>
                <p>Брэнд: {brand || "Отсутсвует"}</p>
            </button>
            <button onClick={handlePriceClick}>
                <p>Цена: {price}</p>
            </button>
        </div>
    )
}

export default Product