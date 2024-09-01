import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';

const url  = `https://touching-quagga-tightly.ngrok-free.app`

const Api:AxiosInstance = axios.create({baseURL:url + "/api"})

Api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem("token")
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

Api.interceptors.response.use(
    async (res: AxiosResponse) => res.data,
    async (err: AxiosError) => Promise.reject(err)
)

export {Api}