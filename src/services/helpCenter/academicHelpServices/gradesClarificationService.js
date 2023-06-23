import axios from "axios";
import env from "../../../enviroment/environment";
import { filterEmpty } from "../../../helpers/filterEmpty";
import {
  handleErrorGetProcedure,
  handleErrorPostProcedure,
} from "../../../helpers/handleError";
import { store } from "../../../store/store";
import { typesFormsHelpCenter } from "../../../types/typesHelpCenter";
import { getAcademicHelpHttp } from "./academicHelpService";

const baseUrl = "";
const academicHelpUrl = env.academicHelp;


export const getGradesClarificationHttp = async () => {
  try {
    let { recordType } = store.getState().helpCenterAcademic;
    let newOptionsAdes = null;

    if (!recordType) {
      const { recordType: NewsTickets,optionsAdes } = await getAcademicHelpHttp();
      recordType = NewsTickets;
      newOptionsAdes = optionsAdes;
    }

    const record = recordType.find((item) => item.name === typesFormsHelpCenter.academicHelp.gradesClarification.id)

    const { recordTypeId } = record;
    const handleCheckboxes = (item) => {
      return {
        disabled: false,
        selected: false,
        name: item.value,
        label: item.label,
      };
    };

    const optionsCheckboxes = record.issues.map((item) => {
      return handleCheckboxes(item);
    });

    return {
      optionsCheckboxes,
      recordTypeId,
      optionsAds: newOptionsAdes
    };
  } catch (error) {
    const { status, data } = error.response || { status: null, data: null };
    throw new Error(handleErrorGetProcedure(status, data));
  }
};

export const postGradesClarificationHttp = async (data, recordId, file) => {
  try {
    let headers = filterEmpty(store.getState().headers);

    headers = {
      ...headers,
      "Service-Id": "virtual-campus-helpcenter-api",
      "Service-Name": "HelpCenter Service API",
    };
    const url = `${baseUrl}${academicHelpUrl}`;
    const files =
      file.name && file.body && file.type
        ? [
            {
              fileName: file.name,
              fileBody: file.body,
              fileType: file.type,
            },
          ]
        : []; 
    const {adeId,ownerId} = store.getState()?.helpCenterAcademic?.optionsAds.find(e => e?.value === data?.selectAdesRequest);
    const { data: res } = await axios({
      method: "post",
      headers,
      url,
      data: {
        subject: data.assignment,
        issueDescription: data.description,
        recordTypeId: recordId,
        teacher: data.professor,
        files,
        requestTypeValue: data.selectCheckboxes,
        adeId,
        ownerId,
        activity: null,
        paymentDate: null,
        paymentTypeValue: null,
        paymentQuantity: null,
        materialToReport: null,
        classDate: null
      },
    });
    const { ticketNumber } = res.data;
    return { ticketNumber };
  } catch (error) {
    const { status, data } = error.response || { status: null, data: null };
    throw new Error(handleErrorPostProcedure(status, data));
  }
};
