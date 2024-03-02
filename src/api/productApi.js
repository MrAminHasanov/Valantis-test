import md5 from "md5";

const URL = "http://api.valantis.store:40000/";
const password = "Valantis";

const getTimeStamp = () => {
    const nowDate = new Date();

    const thisYear = String(nowDate.getFullYear());
    const thisMonth =
        (nowDate.getMonth() < 9
            ? "0" : "")
        + String(nowDate.getMonth() + 1);
    const thisDay =
        (nowDate.getDate() < 10
            ? "0" : "")
        + String(nowDate.getDate());
    const timeStamp = thisYear + thisMonth + thisDay;
    return timeStamp
}

const getXAuth = () => {
    const timeStamp = getTimeStamp();
    const XAuth = md5(`${password}_${timeStamp}`);

    return XAuth
}

const fetchApi = async (action, params) => {
    try {

        const response = await fetch(URL, {
            headers: {
                "X-Auth": getXAuth(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ action, params }),
            method: "POST"
        });

        return response
    } catch (error) {
        throw error
    }
}

export const productApi = {
    getIds: (params) => fetchApi("get_ids", params),
    getProducts: (ids) => fetchApi("get_items", { ids }),
    getFields: (params) => fetchApi("get_fields", params),
    getFilteredProductsIds: (params) => fetchApi("filter", params)
}
