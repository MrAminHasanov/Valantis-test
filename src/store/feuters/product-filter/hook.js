import { useCallback } from "react"
import { actions } from "./slice"
import { useDispatch } from "react-redux";
import { getFieldsThunk } from "./thunks";

export const useProductsFilterActions = () => {
    const dispatch = useDispatch();

    const setPageIndex = useCallback(
        (pageIndex) => {
            dispatch(actions.setActivePage(pageIndex));
        }, [dispatch]
    )

    const setFilterParams = useCallback(
        (filterParam) => {
            dispatch(actions.setFilterParams(filterParam));
            dispatch(actions.setActivePage(1));

        }, [dispatch]
    )

    const setPageCount = useCallback(
        (pageCount) => {
            dispatch(actions.setPageCount(pageCount));
        }, [dispatch]
    )

    const addBrands = useCallback(
        async (offset, prevBrands) => {
            try {
                const thunkParam = { field: "brand", offset, limit: 200 };
                const newBrands = await dispatch(getFieldsThunk(thunkParam)).unwrap();

                const allSortedBrands = Array.from(new Set(
                    prevBrands.concat(newBrands)
                ))
                
                dispatch(actions.addBrands(allSortedBrands));
            }
            catch (error) {
                throw error
            }
        }, [dispatch]
    )

    const startBrandsLoading = useCallback(
        async () => {
            dispatch(actions.setBrandsStatus("idle"));
        }, [dispatch]
    )

    return {
        setPageIndex,
        setPageCount,
        setFilterParams,
        addBrands,
        startBrandsLoading
    }
}