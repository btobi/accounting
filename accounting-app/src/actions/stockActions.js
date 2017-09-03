import axios from "axios"
import store from "../store"

export function fetchStocks() {
    return {
        type: "FETCH_STOCKS",
        payload: axios.get("http://localhost:8000/api/stocks")
    }
}