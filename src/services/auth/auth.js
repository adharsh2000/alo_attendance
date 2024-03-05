import axios from "axios";
import { message } from "antd";

const SECONDS = 30;
const MILISECONDS = 1000;
const TIMEOUT = SECONDS * MILISECONDS;

const client = axios.create({
    baseURL: "https://aloinfotech.in/api/api",
    timeout: TIMEOUT,
    headers: {
        "content-type": "application/json",
    },
});

client.interceptors.request.use(function (config) {
    return config;
});

client.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response.code !== 401) {
            message.error(error?.response?.data?.message);
        } else if (error.response.code !== 200) {
            message.error(error?.response?.data?.data);
        } else if (error.response.code === 400) {
            message.error(error?.response?.data?.message);
        } else {
            console.error(error);
        }
        return Promise.reject(error);
    }
);

const appLogin = async (formData) => {
    const { data } = await client.post(`/employee/login`, formData);
    return data;
};

export {
    appLogin
};
