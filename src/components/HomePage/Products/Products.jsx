import c from './Products.module.scss';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { productsSelector, productsStatusSelector, useProductsActions } from '../../../store/feuters/products';
import { productActivePageSelector, productFilterParamSelector } from '../../../store/feuters/product-filter/selectors';

import Product from './Product/Product';
import Loader from '../../Loader/Loader';
import ErrorStatus from '../../ErrorStatus/ErrorStatus';

function Products() {
    const { getFilteredProductsIds, getIds, getProducts } = useProductsActions();
    const products = useSelector(productsSelector);
    const status = useSelector(productsStatusSelector);
    const activePage = useSelector(productActivePageSelector);
    const productFilterParam = useSelector(productFilterParamSelector);

    useEffect(() => {
        (async () => {
            try {
                if (status === "loading" ||
                    status === "error" ||
                    status === "success" ||
                    status === "Product not found") {
                    return
                }

                const ids =
                    productFilterParam === null
                        ? await getIds(activePage - 1)
                        : await getFilteredProductsIds(activePage - 1, productFilterParam);

                await getProducts(ids);
            } catch (error) {
                console.log("products catch error");
                console.error(error)
            }
        })()
    }, [getIds, getProducts, getFilteredProductsIds, status, activePage, productFilterParam])

    return (
        <div className={c.component}>
            {
                (() => {
                    switch (status) {
                        case "loading":
                        case "serverError": {
                            return <Loader status={status} />
                        }
                        case "Product not found":
                        case "error": {
                            return <ErrorStatus errorMesage={status} />
                        }
                        default: {
                            return products.map((product) => <Product props={product} key={product.id} />)
                        }
                    }
                })()
            }

        </div>
    )
}

export default Products;
