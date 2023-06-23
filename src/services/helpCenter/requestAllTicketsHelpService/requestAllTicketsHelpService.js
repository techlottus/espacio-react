import axios from "axios";
import { typeRequestStatus } from "../../../constants/Procedures.constant";
import { labelSidebar, SidebarTable } from "../../../constants/Sidebar.constant";
import env from "../../../enviroment/environment";
import { filterEmpty } from "../../../helpers/filterEmpty";
import { handleError } from "../../../helpers/handleError";
import { store } from "../../../store/store";

const baseUrl = "";
const urlRecordStudy = env.getTicketsHelpCenter;

export const getRequesAllTicketsHelpCenterHttp = async () => {
  try {
    let headers = filterEmpty(store.getState().headers);

    const url = `${baseUrl}${urlRecordStudy}`;

    headers = {
      ...headers,
      "Service-Id": "virtual-campus-helpcenter-api",
      "Service-Name": "HelpCenter Service API"
    };

    const { data: res } = await axios({
      method: "get",
      url,
      headers,
    });

    const requestAll = res.data;

    return requestAll.map((e) => {
      const card = {
        icon: "description",
        title: e?.servicio,
        disabled: false,
        isContent: true,
        date: e?.fechasolicitud,
        ticket: e?.numticket,
        id: e?.transactionNumber
      };
      const label = {
        ...labelSidebar,
        title: e?.estatus,
      };
      const isButton = (e?.estatus === typeRequestStatus.new || e?.estatus === typeRequestStatus.pedding) && card.id;
      const table = {
        ...SidebarTable,
        rows: [
          [
            { title: e?.matricula },
            { title: e?.alumno },
            { title: e?.programa },
            { title: e?.servicio },
            { title: e?.numticket },
            { title: e?.estatus },
            { title: e?.subestatus },
            { title: addDays(e?.fechasolicitud,6) },
          ],
        ],
      };

      return {
        card,
        label,
        table,
        isButton,
      };
    });
  } catch (error) {
    const { status, data } = error.response || { status: null, data: null };
    throw new Error(handleError(status, data));
  }
};

const addDays = (date, number) => {
  const newDate = new Date(date);
  return new Date(newDate.setDate(newDate.getDate() + number)).toLocaleDateString();
}
