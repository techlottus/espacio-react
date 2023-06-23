import axios from "axios";
import env from "../../enviroment/environment";
import { filterEmpty } from "../../helpers/filterEmpty";
import { handleError } from "../../helpers/handleError";
import { store } from "../../store/store";
import { getValuesOfAuth } from "../../helpers/auth";


const baseUrl =''
const urlGetDashboard = env.getDashboard

export const getDashboard= async() => {
    try {
        let headers = filterEmpty(store.getState().headers);

        headers = {
            ...headers,
            "Service-Id": "virtual-campus-dashboard-api",
            "Service-Name": "Dashboard Service API"
          };
      
          const { userId } = getValuesOfAuth();
          const params = {
            userId,
          };

        const url = `${baseUrl}${urlGetDashboard}`

        const {data:res} = await axios({
            method: 'get',
            url:'https://app-cv-dashboard-dev.azurewebsites.net/dashboard',
            headers, 
            params,
        })
        return res.data;

    } catch (error) {
        const { status,data } = error.response || { status: null, data:null };
        throw new Error(handleError(status,data));
    }
}