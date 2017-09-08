import axios from "axios"

export function fetchStocks() {
    return {
        type: "FETCH_STOCKS",
        payload: axios.get("http://localhost:8000/api/stocks")
    }
}