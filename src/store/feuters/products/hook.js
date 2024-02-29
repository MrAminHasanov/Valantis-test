import { useCallback } from "react"
import { actions } from "./slice"
import { getFilteredProductsIdsThunk, getIdsThunk, getProductsThunk } from "./thunks"
import { useDispatch } from "react-redux";
import { useProductsFilterActions } from "../product-filter/hook";

export const useProductsActions = () => {
    const dispatch = useDispatch();
    const { setPageCount } = useProductsFilterActions()

    const getIds = useCallback(
        async (pageIndex, ids = new Set(), step = 0) => {
            try {
                const offset = (pageIndex + step) * 50;
                const newIds = new Set(await dispatch(getIdsThunk({ offset, limit: 55 })).unwrap());

                for (let newId of newIds) {
                    if (ids.size === 50) {
                        setPageCount("unlimited");
                        return ids
                    } else {
                        ids.add(newId);
                    }
                }

                return getIds(pageIndex, ids, ++step);
            } catch (error) {
                throw error
            }
        }, [dispatch, setPageCount]
    )

    const getProducts = useCallback(
        async (ids) => {
            try {
                const products = await dispatch(getProductsThunk(Array.from(ids))).unwrap();
                const filteredProducts = products.filter(({ id }) => {
                    if (ids.has(id)) {
                        ids.delete(id);
                        return true
                    } return false
                })

                dispatch(actions.setProducts(filteredProducts))
            }
            catch (error) {
                throw error
            }
        }, [dispatch]
    )

    const getFilteredProductsIds = useCallback(
        async (pageIndex, filterParam) => {
            try {
                const ids = new Set(await dispatch(getFilteredProductsIdsThunk(filterParam)).unwrap());

                if (ids.size === 0) {
                    dispatch(actions.setStatus("Product not found"));
                    throw new Error("Product not found");
                }

                const sortedIds =
                    new Set(
                        Array.from(ids).slice(pageIndex * 50, (pageIndex + 1) * 50)
                    )

                const pageCount = Math.ceil(ids.size / 50);
                setPageCount(pageCount);

                return sortedIds
            }
            catch (error) {
                throw error
            }
        }, [dispatch, setPageCount]
    )

    const startProductsUpdate = useCallback(
        () => {
            dispatch(actions.setStatus("idle"));
        }, [dispatch]
    )

    return {
        getProducts,
        getFilteredProductsIds,
        getIds,
        startProductsUpdate
    }
}