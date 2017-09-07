import Http from "../http"


export function getAccountingRecords() {
    return {
        type: "FETCH_ACCOUNTING_RECORDS",
        payload: Http.get("/accounting/records")
    }
}

export function postAccountingRecord(record) {
    return {
        type: "POST_ACCOUNTING_RECORD",
        payload: Http.post("/accounting/record", record),
        callback: getAccountingRecords
    }
}