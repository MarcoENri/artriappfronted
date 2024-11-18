
import { Apiurl } from "../../../../HomeSection/pages/constantes/apiurl"

export const address = `${Apiurl}/api/address`
import axios from 'axios'

let config = {
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
      }
    }

export const fetchAddress = async (url:string) => {
    return fetch(url).then(res=> res.json())
}
export const createAddress = async (url: string, { arg }:any) => {
    const response =  await axios.post(url , arg, config)
    return response.data
}

export const updateAddress = async (url: string, { arg }:any) => {
    const response =  await axios.put(url, arg, config)
    return response.data
}