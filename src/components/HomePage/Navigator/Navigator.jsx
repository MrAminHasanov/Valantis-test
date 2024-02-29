import { useSelector } from "react-redux";
import c from "./Navigator.module.scss";
import { productActivePageSelector, productPageCountSelector, useProductsFilterActions } from "../../../store/feuters/product-filter";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { productsStatusSelector, useProductsActions } from "../../../store/feuters/products";

function Navigator() {
    const idleStatus = useSelector(productsStatusSelector);
    const pageCount = useSelector(productPageCountSelector);
    const activePage = useSelector(productActivePageSelector);
    const [pageListCounter, setPageListCounter] = useState(0);
    const [pageButtonCount, setPageButtonCount] = useState(4);

    // console.log(pageCount);
    useEffect(() => {
        setPageButtonCount(
            (pageCount === "unlimited" || pageCount > 3)
                ? 4
                : pageCount
        )
    }, [pageCount])

    const { setPageIndex } = useProductsFilterActions();
    const { startProductsUpdate } = useProductsActions();

    const prevButtonHandleClick = () => setPageListCounter((count) => --count);
    const nextButtonHandleClick = () => setPageListCounter((count) => ++count);
    const pageButtonHandleClick = (pageIndex) => {
        setPageIndex(pageIndex);
        startProductsUpdate();
    };

    const getPageButtonClassNames = (buttonNumb) => classNames(c.pageButton, { [c.activeButton]: buttonNumb === activePage })
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
                                        (idleStatus === "error" || idleStatus === "success") &&
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
                    pageCount === "unlimited" ||
                    (pageListCounter + 4) < pageCount
                ) &&
                <button onClick={nextButtonHandleClick} className={c.nextButton}>{`>`}</button>
            }
        </div >
    )
}

export default Navigator