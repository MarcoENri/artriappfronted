
import { Apiurl } from "../../../../HomeSection/pages/constantes/apiurl"

export const song = `${Apiurl}/api/song`
import axios from 'axios'

let config = {
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
      }
    }

export const fetchSong = async (url:string) => {
    return fetch(url).then(res=> res.json())
}
export const createSong = async (url: string, { arg }:any) => {
    const response =  await axios.post(url , arg, config)
    return response.data
}

export const updateSong = async (url: string, { arg }:any) => {
    const response =  await axios.put(url, arg, config)
    return response.data
}