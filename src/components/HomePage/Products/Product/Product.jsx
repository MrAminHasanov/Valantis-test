import c from "./Product.module.scss";


function Product({ props }) {
    const { id, brand, price, product } = props;
    return (
        <div className={c.component}>
            <p>Продкут: {product}</p>
            <p className={c.id}>ID: {id}</p>
            <p>Брэнд: {brand || "Нету"}</p>
            <p>Цена: {price}</p>
        </div>
    )
}

export default Product