import c from "./Product.module.scss";

import { useProductsActions } from "../../../../store/feuters/products"
import { useProductsFilterActions } from "../../../../store/feuters/product-filter"

function Product({ props: { id, brand, price, product } }) {

    const { setFilterParams } = useProductsFilterActions();
    const { startProductsUpdate } = useProductsActions();

    const handleProductClick = () => {
        setFilterParams({ product });
        startProductsUpdate();
    }
    const handleBrandClick = () => {
        setFilterParams({ brand });
        startProductsUpdate();
    }
    const handlePriceClick = () => {
        setFilterParams({ price });
        startProductsUpdate();
    }

    return (
        <div className={c.component}>
            <button onClick={handleProductClick}>
                <p>Продкут: {product}.</p>
            </button>
            <p className={c.id}>ИД: {id}</p>
            <button onClick={handleBrandClick}>
                <p>Брэнд: {brand || "Нету"}</p>
            </button>
            <button onClick={handlePriceClick}>
                <p>Цена: {price}</p>
            </button>
        </div>
    )
}

export default Product