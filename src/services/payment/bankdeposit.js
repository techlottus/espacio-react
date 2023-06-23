import axios from "axios";
import env from "../../enviroment/environment";
import { getValuesOfAuth } from "../../helpers/auth";
import { filterEmpty } from "../../helpers/filterEmpty";
import { handleError } from "../../helpers/handleError";
import { store } from "../../store/store";

const baseUrl = ''
const urlGetBankDeposit = env.getBankDeposit

export const getBankDepositHttp= async(transactionNumber,amount) => {
    try {
        let headers = filterEmpty(store.getState().headers);

        headers = {
            ...headers,
            'Service-Id': 'virtual-campus-payment-api'
        }
        
        const { userId:studentId } = getValuesOfAuth(); 

        const params = {studentId, transactionNumber,amount }

        const url = `${baseUrl}${urlGetBankDeposit}`

         const res = await axios({
            method: 'get',
            url,
            params,
            headers, 
            responseType: 'blob',
        })
        return res.data;

    } catch (error) {
        const { status,data } = error?.response || { status: null, data:null };
        throw new Error(handleError(status,data));
    }
}