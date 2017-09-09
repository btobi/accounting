import Http from "Http";

export function getAccountsStatistics(data = {year: null, month: null, get_next: false, get_previous: false}) {
    return {
        type: "GET_ACCOUNTS_STATISTICS",
        payload: Http.post("/statistics/accounts", data)
    }
}