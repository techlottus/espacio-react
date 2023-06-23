import axios from "axios";
import env from "../../enviroment/environment";
import { getValuesOfAuth } from "../../helpers/auth";
import { filterEmpty } from "../../helpers/filterEmpty";
import { handleError } from "../../helpers/handleError";
import { store } from "../../store/store";


const baseUrl = ''
const urlGetMercadoPago = env.getMercadoPago

export const getMercadoPagoHttp= async(transactionNumber) => {
    try {
        let headers = filterEmpty(store.getState().headers);

        headers = {
            ...headers,
            'Service-Id': 'virtual-campus-payment-api'
        }

        const { userId:studentId } = getValuesOfAuth(); 

        const params = {studentId , transactionNumber }

        const url = `${baseUrl}${urlGetMercadoPago}`

        await axios({
            method: 'get',
            url,
            params,
            headers, 
        })
        return ;

    } catch (error) {
        const { status,data } = error.response || { status: null, data:null };
        throw new Error(handleError(status,data));
    }
}