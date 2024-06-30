import axios, { AxiosRequestConfig } from "axios"
type Params = {
    endpoint:string 
}
const baseURL = import.meta.env.VITE_BASEURL
export const getData = async (params:Params)=>{
    const token = localStorage.getItem('sego_token')
    const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      }
    
      const getConfig: AxiosRequestConfig = {
        headers,
      }
    try {
        const data = await axios.get(`${baseURL}${params.endpoint}`,getConfig)
        return data
    } catch (error) {
        console.error(error)
    }
}