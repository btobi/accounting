import Http from "../http"


export function getAccounts() {
    return {
        type: "FETCH_ACCOUNTS",
        payload: Http.get("/api/accounts")
    }
}