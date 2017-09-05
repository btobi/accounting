import axios from "axios"
const API_PATH = "http://localhost:8080";


export default class Http {

    static get(path) {
        return axios.get(API_PATH + path);

    }

}

