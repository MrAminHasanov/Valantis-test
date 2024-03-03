import c from './Products.module.scss';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { productsStatusMessageSelector, productsSelector, productsStatusSelector, useProductsActions } from '../../../store/feuters/products';
import { productActivePageSelector, productFilterParamSelector } from '../../../store/feuters/product-filter/selectors';

import { statusConst } from '../../../store/statusConstants';

import Product from './Product/Product';
import Loader from './Loader/Loader';
import ErrorStatus from './ErrorStatus/ErrorStatus';

function Products() {
    const products = useSelector(productsSelector);
    const status = useSelector(productsStatusSelector);
    const activePage = useSelector(productActivePageSelector);
    const productFilterParam = useSelector(productFilterParamSelector);
    const statusMessage = useSelector(productsStatusMessageSelector);
    const { getFilteredProductsIds, getIds, getProducts } = useProductsActions();

    useEffect(() => {
        if (!(
            status === statusConst.serverError ||
            status === statusConst.idle)) {
            return
        }
        (async () => {
            try {
                const ids =
                    productFilterParam === null
                        ? await getIds(activePage - 1)
                        : await getFilteredProductsIds(activePage - 1, productFilterParam);

                await getProducts(ids);
            } catch (error) {
                if (!isNaN(error)) {
                    console.error(error)
                }
            }
        })()
    }, [getIds, getProducts, getFilteredProductsIds,
        status, activePage, productFilterParam])

    return (
        <div className={c.component}>
            {
                (() => {
                    switch (status) {
                        case statusConst.loading:
                        case statusConst.serverError:
                            {
                                return <Loader status={statusMessage} />
                            }
                        case statusConst.productNotFounded:
                        case statusConst.error:
                            {
                                return <ErrorStatus errorMesage={statusMessage} />
                            }
                        default: {
                            return products.map((product) =>
                                <Product props={product} key={product.id} />)
                        }
                    }
                })()
            }

        </div>
    )
}

export default Products;
