import c from "./Navigator.module.scss";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import classNames from "classnames";

import { productActivePageSelector, productPageCountSelector, useProductsFilterActions } from "../../../store/feuters/product-filter";
import { productsStatusSelector, useProductsActions } from "../../../store/feuters/products";

import { statusConst } from "../../../store/statusConstants";

function Navigator() {
    const status = useSelector(productsStatusSelector);
    const pageCount = useSelector(productPageCountSelector);
    const activePage = useSelector(productActivePageSelector);
    const [pageListCounter, setPageListCounter] = useState(0);
    const [pageButtonCount, setPageButtonCount] = useState(4);

    const { setPageIndex } = useProductsFilterActions();
    const { setUpdateStatus } = useProductsActions();

    useEffect(() => {
        setPageButtonCount(
            pageCount > 3
                ? 4
                : pageCount
        );

        setPageIndex(1);
        setPageListCounter(0);
    }, [pageCount, setPageIndex])


    const prevButtonHandleClick = () => setPageListCounter((count) => --count);
    const nextButtonHandleClick = () => setPageListCounter((count) => ++count);
    const pageButtonHandleClick = (pageIndex) => {
        setPageIndex(pageIndex);
        setUpdateStatus();
    };

    const getPageButtonClassNames = (buttonNumb) => classNames(c.pageButton, { [c.activeButton]: buttonNumb === activePage })

    if (status !== statusConst.success) {
        return null
    }

    return (
        <div className={c.component}>
            {
                pageListCounter > 0 &&
                <button onClick={prevButtonHandleClick} className={c.prevButton}>{`<`}</button>
            }
            <div className={c.pageButtonBox}>
                {
                    (() => {
                        const arr = [];
                        for (let i = 1; i <= pageButtonCount; ++i) {
                            const buttonNumb = pageListCounter + i;
                            arr.push(
                                <button
                                    className={getPageButtonClassNames(buttonNumb)}
                                    key={buttonNumb}
                                    onClick={() =>
                                        buttonNumb !== activePage &&
                                        pageButtonHandleClick(buttonNumb)}
                                >
                                    {buttonNumb}
                                </button>
                            )
                        }

                        return arr
                    })()
                }
            </div>

            {
                (
                    (pageListCounter + 4) < pageCount
                ) &&
                <button onClick={nextButtonHandleClick} className={c.nextButton}>{`>`}</button>
            }
        </div >
    )
}

export default Navigator