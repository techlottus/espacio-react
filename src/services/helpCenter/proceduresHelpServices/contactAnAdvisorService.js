import axios from "axios";
import env from "../../../enviroment/environment";
import { filterEmpty } from "../../../helpers/filterEmpty";
import {
  handleErrorGetProcedure,
  handleErrorPostProcedure,
} from "../../../helpers/handleError";
import { store } from "../../../store/store";
import {
  typeIdHelpCenterProcedures,
} from "../../../types/typesHelpCenter";

const baseUrl = "";
const proceduresHelpUrl = env.proceduresHelp;

export const getContactAnAdvisorHttp = async () => {
  try {
    const { recordType } = store.getState().helpCenterProcedures;
    const record = recordType.find(
      (item) => item.value === typeIdHelpCenterProcedures.contactAnAdvisor
    );
    const { value } = record;
    return {
      value,
    };
  } catch (error) {
    const { status, data } = error.response || { status: null, data: null };
    throw new Error(handleErrorGetProcedure(status, data));
  }
};

export const postContactAnAdvisorHttp = async (data, recordId, file) => {
  try {
    let headers = filterEmpty(store.getState().headers);

    headers = {
      ...headers,
      "Service-Id": "virtual-campus-helpcenter-api",
      "Service-Name": "HelpCenter Service API",
    };
    const url = `${baseUrl}${proceduresHelpUrl}`;
    const files =
      file && file.name && file.body && file.type
        ? [
            {
              fileName: file.name,
              fileBody: file.body,
              fileType: file.type,
            },
          ]
        : [];
    const { value } = store.getState().helpCenterProcedures.information;
    const { recordTypeId } = store.getState().helpCenterProcedures;
    const { data: res } = await axios({
      method: "post",
      headers,
      url,
      data: {
        recordTypeId: recordTypeId,
        requestTypeValue: value,
        issueDescription: data.description,
        files,
        reasonChange: null,
        campusTypeValue: null,
        programTypeValue: null,
        areaTypeValue: null,
        subjectTypeValue: null,
        ownerId: null,
        adeId: null,
      },
    });
    const { ticketNumber } = res.data;
    return { ticketNumber };
  } catch (error) {
    const { status, data } = error.response || { status: null, data: null };
    throw new Error(handleErrorPostProcedure(status, data));
  }
};
