import axios from "axios";
import { rootStore } from "../Redux/rootReducer";

class Interceptors {

    public create() {
        axios.interceptors.request.use(function (config) {
            // Do something before request is sent
            const token = rootStore.getState().authReducer.token;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        }, function (error) {
            // Do something with request error
            return Promise.reject(error);
        });
    }

}

const interceptors = new Interceptors();
export default interceptors;