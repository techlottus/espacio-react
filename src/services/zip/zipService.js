import axios from "axios";
import env from "../../enviroment/environment";
import { filterEmpty } from "../../helpers/filterEmpty";
import { handleError } from "../../helpers/handleError";
import { store } from "../../store/store";


const baseUrl = env.host
const urlGetZip = env.getZip

export const getZipHttp= async(zip) => {
    try {
        let headers = filterEmpty(store.getState().headers);

        const url = `${baseUrl}${urlGetZip}/${zip}`

        headers = {
            ...headers,
            "Service-Id": "virtual-campus-ads-api",
            "Service-Name": "Ads Service API",
          };
          
        const {data:res} = await axios({
            method: 'get',
            url,
            headers, 
        })

        return res.data;

    } catch (error) {
        const { status,data } = error.response || { status: null, data:null };
        throw new Error(handleError(status,data));
    }
}