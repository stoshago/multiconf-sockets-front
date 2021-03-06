import axios from 'axios';
import {getRandomHost} from "./elbService";

export const axiosInstance = axios.create({
    baseURL: `http://${getRandomHost()}/`,
    headers: {
        'Content-Type': 'application/json',
    },
});

export class HTTPService {
    static get(path = '', config = {}) {
        return axiosInstance
            .get(`${path}`, config)
            .then((response) => response.data)
            .catch(err => {
                throw new Error(err);
            });
    }

    static post(path, data, config = {}) {
        return axiosInstance
            .post(`${path}`, data, config)
            .then((response) => response.data)
            .catch(err => {
                throw new Error(err);
            });
    }

    static put(path, data, config = {}) {
        return axiosInstance
            .put(`${path}`, data, config)
            .then((response) => response.data)
            .catch(err => {
                throw new Error(err);
            });
    }

    static delete(path = '', config = {}) {
        return axiosInstance
            .delete(`${path}`, config)
            .then((response) => response.data)
            .catch(err => {
                throw new Error(err);
            });
    }
}
