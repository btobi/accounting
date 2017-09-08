import Http from "../http"


export function getAccounts() {
    return {
        type: "FETCH_ACCOUNTS",
        payload: Http.get("/accounts")
    }
}

export function postAccount(account) {
    return {
        type: "POST_ACCOUNT",
        payload: Http.post("/account", account)
    }
}