import { useCallback } from "react"
import { actions } from "./slice"
import { useDispatch } from "react-redux";

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
    return {
        setPageIndex,
        setPageCount,
        setFilterParams
    }
}