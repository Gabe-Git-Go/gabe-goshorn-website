import { getEnvironment } from "./environment";
import axios from 'axios';

const axiosContext = axios.create({
    baseURL: getEnvironment().API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true
});

export const getHttpClient=()=>{
    return axiosContext;
}