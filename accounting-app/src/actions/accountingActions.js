import Http from "../http"


export function getAccountingRecords(requestData) {
    return {
        type: "FETCH_ACCOUNTING_RECORDS",
        payload: Http.post("/accounting/records", requestData)
    }
}

export function postAccountingRecord(record) {
    return {
        type: "POST_ACCOUNTING_RECORD",
        payload: Http.post("/accounting/record", record),
    }
}

export function deleteAccountingRecord(record) {
    return {
        type: "DELETE_RECORD",
        payload: Http.delete("/accounting/record", record),
    }
}