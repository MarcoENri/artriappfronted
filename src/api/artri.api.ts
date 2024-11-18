import axios from "axios";
import { Apiurl } from "../HomeSection/pages/constantes/apiurl" // Importar la URL base

const artriapi = axios.create({
    baseURL:`${Apiurl}/api/v1/auth/`
})

