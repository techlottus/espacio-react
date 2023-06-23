import axios from "axios";
import env from "../../../enviroment/environment";
import { filterEmpty } from "../../../helpers/filterEmpty";
import { getFormatDateHelpCenter } from "../../../helpers/formatDate";
import {
  handleErrorGetProcedure,
  handleErrorPostProcedure,
} from "../../../helpers/handleError";
import { store } from "../../../store/store";
import { typesFormsHelpCenter } from "../../../types/typesHelpCenter";
import { getAcademicHelpHttp } from "./academicHelpService";

const baseUrl = "";
const academicHelpUrl = env.academicHelp;

export const getAcademicRegistrationSubjectsHttp = async () => {
  try {
    let { recordType } = store.getState().helpCenterAcademic;
    let newOptionsAdes = null;

    if (!recordType) {
      const { recordType: NewsTickets,optionsAdes } = await getAcademicHelpHttp();
      recordType = NewsTickets;
      newOptionsAdes = optionsAdes;
    }

    const record = recordType.find(
      (item) =>
        item.name === typesFormsHelpCenter.academicHelp.subjectsRegistration.id
    );
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

export const postAcademicRegistrationSubjectsHttp = async (data, recordId, file) => {
  try {
    let headers = filterEmpty(store.getState().headers);

    headers = {
      ...headers,
      "Service-Id": "virtual-campus-helpcenter-api",
      "Service-Name": "HelpCenter Service API",
    };
    const url = `${baseUrl}${academicHelpUrl}`;
    const {adeId,ownerId} = store.getState()?.helpCenterAcademic?.optionsAds.find(e => e?.value === data?.selectAdesRequest);
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
        const { data: res } = await axios({
      method: "post",
      headers,
      url,
      data: {
        paymentDate: getFormatDateHelpCenter(data.paymentDate || null),
        paymentTypeValue: data.paymentMethod || null,
        paymentQuantity: Number(data.paymentMount)|| null,
        subject:  null,
        issueDescription: data.description,
        recordTypeId: recordId,
        teacher: null,
        materialToReport: null,
        activity: null,
        files,
        requestTypeValue: data.selectCheckboxes,
        classDate: null,
        adeId,
        ownerId
      },
    });
    const { ticketNumber } = res.data;
    return { ticketNumber };
  } catch (error) {
    const { status, data } = error.response || { status: null, data: null };
    throw new Error(handleErrorPostProcedure(status, data));
  }
};
