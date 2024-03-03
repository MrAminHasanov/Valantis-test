import c from './Products.module.scss';
import { useSelector } from 'react-redux';

import { productsStatusMessageSelector, productsSelector, productsStatusSelector } from '../../../store/feuters/products';

import { statusConst } from '../../../store/statusConstants';

import Product from './Product/Product';
import Loader from './Loader/Loader';
import ErrorStatus from './ErrorStatus/ErrorStatus';
import useProductsUpload from '../../../hook/useProductsUpload';

function Products() {
    const products = useSelector(productsSelector);
    const status = useSelector(productsStatusSelector);
    const statusMessage = useSelector(productsStatusMessageSelector);

    useProductsUpload();

    return (
        <div className={c.component}>
            {
                (() => {
                    switch (status) {
                        case statusConst.loading:
                        case statusConst.serverError:
                        case statusConst.startUpdate:
                            {
                                return <Loader loadingMessage={statusMessage} />
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
