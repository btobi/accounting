import axios from "axios"
const API_PATH = "/api";

axios.defaults.headers = {
    ...axios.defaults.headers,
    "X-CSRFToken": document.getElementsByName("csrfmiddlewaretoken")[0].value,
    "X-SOMETHINGTOKEN": "HLLLO"
}

export default class Http {

    static get(path) {
        return axios.get(getPath(path));
    }

    static post(path, data = {}) {
        console.log("POSTING DATA")
        console.log(data)
        return axios.post(getPath(path), data);
    }

    static delete(path, data = {}) {
        console.log("DELETE DATA")
        console.log(data)
        return axios.post(getPath(path), data, {
            headers: { 'X-METHODOVERRIDE': 'DELETE' }
        })
    }

}

function getPath(path = "") {
    return API_PATH + (path.endsWith("/") ? path : path + "/")
}
