import axios, { formToJSON } from "axios";
import { message } from "antd";
import { getSessionStorageItem } from "@/helpers/SessionStorage";

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
    const ALO_TOKEN = sessionStorage.getItem("token")

    if (ALO_TOKEN) {
        config.headers["Authorization"] = `${ALO_TOKEN}`
    }
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

const appEmployeeDashboard = async (id) => {
    const { data } = await client.get(`/employee/${id}`);
    return data;
};

const getAllEmployees = async (search,page) => {
    const { data } = await client.get(`/employee?value=${search}&limit=10&page=${page}`);
    return data;
}

const addEmployee = async (formData) => {
    const { data } = await client.post(`/employee/register`,formData);
    return data;
}

const updateEmployee = async (id,formData) => {
    const { data } = await client.put(`/employee/${id}`,formData);
    return data;
}

const getRoles = async () => {
    const { data } = await client.get(`/role`);
    return data;
}

const appTimeSheet = async (id) => {
    const { data } = await client.get(`/timeSheet?employeeId=${id}`);
    return data;
};

const deleteEmployee = async (id) => {
    const { data } = await client.delete(`/employee/${id}`)
    return data;
}

const loginDashboard = async (formData) => {
    const { data } = await client.post(`/timeSheet`, formData);
    return data;
};

const logoutDashboard = async (formData) => {
    const { data } = await client.put(`/timeSheet`, formData);
    return data;
};

export {
    appEmployeeDashboard,
    appTimeSheet,
    loginDashboard,
    logoutDashboard,
    getAllEmployees,
    getRoles,
    addEmployee,
    deleteEmployee,
    updateEmployee
};
