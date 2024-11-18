
import { Apiurl } from "../../../../HomeSection/pages/constantes/apiurl"
export const member = `${Apiurl}/api/v1/member`
import axios from 'axios'

let config = {
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
      "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE"
      },
      credentials: 'same-origin',
    }

export const fetchMember = async (url:string) => {
    return fetch(url).then(res=> res.json())
}
export const createMember = async (url: string, { arg }:any) => {
    const response =  await axios.post(url , arg, config)
    return response.data
}

export const updateMember = async (url: string, { arg }:any) => {
    const response =  await axios.patch(url, arg, config)
    return response.data
}