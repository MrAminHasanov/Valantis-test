import c from "./Product.module.scss";

import { useProductsActions } from "../../../../store/feuters/products"
import { useProductsFilterActions } from "../../../../store/feuters/product-filter"

function Product({ props: { id, brand, price, product } }) {
    const { setFilterParams, setPageIndex } = useProductsFilterActions();
    const { setUpdateStatus } = useProductsActions();

    const handleButtonClick = (paramKey, param) => {
        setFilterParams({ [paramKey]: param });
        setPageIndex(1);

        setUpdateStatus();
    }

    return (
        <div className={c.component}>
            <button onClick={() => handleButtonClick("product", product)}>
                <p>Продкут: {product}.</p>
            </button>
            <br />
            <p className={c.id}>ИД: {id}</p>
            <button onClick={() => handleButtonClick("brand", brand)}>
                <p>Брэнд: {brand || "Отсутсвует"}</p>
            </button>
            <button onClick={() => handleButtonClick("price", price)}>
                <p>Цена: {price}</p>
            </button>
        </div>
    )
}

export default Product