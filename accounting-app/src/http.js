import axios from "axios"
const API_PATH = "http://localhost:8080/api";

axios.defaults.headers = {
    ...axios.defaults.headers,
    "X-CSRFToken": document.getElementsByName("csrfmiddlewaretoken")[0].value
}

export default class Http {

    static get(path) {
        return axios.get(API_PATH + sanitizePath(path));
    }

    static post(path, data = {}) {
        console.log("POSTING DATA")
        console.log(data)
        return axios.post(API_PATH + sanitizePath(path), data);
    }

}

function sanitizePath(path = "") {
    return path.endsWith("/") ? path : path + "/"
}
