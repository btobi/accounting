import Http from "../http"


export function getAccountingRecords() {
    return {
        type: "FETCH_ACCOUNTING_RECORDS",
        payload: Http.get("/api/accounting/records")
    }
}