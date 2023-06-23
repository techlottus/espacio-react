import axios from "axios";
import env from "../../../enviroment/environment";
import { filterEmpty } from "../../../helpers/filterEmpty";
import {
  handleErrorGetProcedure,
  handleErrorPostProcedure,
} from "../../../helpers/handleError";
import { store } from "../../../store/store";
import { typesFormsHelpCenter } from "../../../types/typesHelpCenter";
import { getTechnicalHelpHttp } from "./technicalHelpService";

const baseUrl = "";
const technicalHelpUrl = env.technicalHelp;

export const getTechnicalLibraryAndAColectionsHttp = async () => {
  try {
    let { recordType } = store.getState().helpCenterTechnical;
    let newOptionsAdes = null;

    if (!recordType) {
      const { recordType: NewsTickets,optionsAdes } = await getTechnicalHelpHttp();
      recordType = NewsTickets;
      newOptionsAdes = optionsAdes
    }

    const record = recordType.find(
      (item) =>
        item.name ===
        typesFormsHelpCenter.technicalHelp.librarySupport.id
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

export const postTechnicalLibraryAndAColectionsHttp = async (
  data,
  recordId,
  file
) => {
  try {
    let headers = filterEmpty(store.getState().headers);

    headers = {
      ...headers,
      "Service-Id": "virtual-campus-helpcenter-api",
      "Service-Name": "HelpCenter Service API",
    };
    const url = `${baseUrl}${technicalHelpUrl}`;
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
    const {adeId,ownerId} = store.getState()?.helpCenterTechnical?.optionsAds.find(e => e?.value === data?.selectAdesRequest);
    const { data: res } = await axios({
      method: "post",
      headers,
      url,
      data: {
        adeId,
        ownerId,
        subject: data.subject,
        teacher: data.teacher,
        activity: data.activity,
        issueDescription: data.description,
        recordTypeId: recordId,
        materialToReport: '',
        files,
        requestTypeValue: data.selectCheckboxes,
        classDate: null,
      },
    });
    const { ticketNumber } = res.data;
    return { ticketNumber };
  } catch (error) {
    const { status, data } = error.response || { status: null, data: null };
    throw new Error(handleErrorPostProcedure(status, data));
  }
};
