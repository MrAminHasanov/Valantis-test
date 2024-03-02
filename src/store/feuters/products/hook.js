import { useCallback } from "react"
import { actions } from "./slice"
import { useDispatch } from "react-redux";

import { getFilteredProductsIdsThunk, getIdsThunk, getProductsThunk } from "./thunks"
import { useProductsFilterActions } from "../product-filter/hook";

import { statusConst } from "../../statusConstants";

export const useProductsActions = () => {
    const dispatch = useDispatch();
    const { setPageCount } = useProductsFilterActions()

    const getIds = useCallback(
        async (pageIndex) => {
            try {
                const ids = new Set([])
                let step = 0;

                while (ids.size !== 50) {
                    const offset = (pageIndex + step) * 50;
                    const newIds = await dispatch(getIdsThunk({ offset, limit: 54 })).unwrap();
                    const uniqueNewIds = new Set(newIds)

                    for (let newId of uniqueNewIds) {
                        if (ids.size !== 50) {
                            ids.add(newId);
                        } else {
                            break
                        }
                    }
                    ++step;
                }

                setPageCount("unlimited");
                return Array.from(ids);
            } catch (error) {
                throw error
            }
        }, [dispatch, setPageCount]
    )

    const getProducts = useCallback(
        async (ids) => {
            try {
                dispatch(getProductsThunk(ids));
            }
            catch (error) {
                throw error
            }
        }, [dispatch]
    )

    const getFilteredProductsIds = useCallback(
        async (pageIndex, filterParam) => {
            try {
                const ids = await dispatch(getFilteredProductsIdsThunk(filterParam)).unwrap();
                if (ids.length === 0)
                    throw new Error("Product not founded");

                const uniqueIds = Array.from(new Set(ids));
                const indexedPageIds = uniqueIds.slice(pageIndex * 50, (pageIndex + 1) * 50);

                const pageCount = Math.ceil(uniqueIds.length / 50);
                setPageCount(pageCount);

                return indexedPageIds
            }
            catch (error) {
                throw error
            }
        }, [dispatch, setPageCount]
    )

    const startProductsUpdate = useCallback(
        () => {
            dispatch(actions.setStatus(statusConst.idle));
        }, [dispatch]
    )

    return {
        getProducts,
        getFilteredProductsIds,
        getIds,
        startProductsUpdate
    }
}