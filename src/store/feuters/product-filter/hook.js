import { useCallback } from "react"
import { actions } from "./slice"
import { useDispatch } from "react-redux";
import { getFieldsThunk } from "./thunks";
import { statusConst } from "../../statusConstants";

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
        }, [dispatch]
    )

    const setPageCount = useCallback(
        (pageCount) => {
            dispatch(actions.setPageCount(pageCount));
        }, [dispatch]
    )

    const addBrands = useCallback(
        async (offset) => {
            try {
                const thunkParam = { field: "brand", offset, limit: 200 };
                dispatch(getFieldsThunk(thunkParam));
            }
            catch (error) {
                throw error
            }
        }, [dispatch]
    )

    const startBrandsLoading = useCallback(
        async () => {
            dispatch(actions.setBrandsStatus(statusConst.startUpdate));
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
