
import { Apiurl } from "../../../HomeSection/pages/constantes/apiurl"

export const statistics = `${Apiurl}/api/statistics`
import axios from 'axios'

let config = {
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
      }
    }

export const fetchStatistics = async (url:string) => {
    return fetch(url).then(res=> res.json())
}
export const createStatistics = async (url: string, { arg }:any) => {
    const response =  await axios.post(url , arg, config)
    return response.data
}

export const updateStatistics = async (url: string, { arg }:any) => {
    const response =  await axios.put(url, arg, config)
    return response.data
}