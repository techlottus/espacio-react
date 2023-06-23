import axios from "axios";
import env from "../../enviroment/environment";
import { getValuesOfAuth } from "../../helpers/auth";
import { filterEmpty } from "../../helpers/filterEmpty";
import {
  handleErrorGetProcedure,
  handleErrorPostProcedure,
} from "../../helpers/handleError";
import { store } from "../../store/store";
import { typesDegree, typesModalityBanner } from "../../types/typesProcedures";

const baseUrl = "";
const urlGetDegree = env.degree;

export const getDegreeHttp = async () => {
  try {
    let headers = filterEmpty(store.getState().headers);

    const url = `${baseUrl}${urlGetDegree}`;

    headers = {
      ...headers,
      "Service-Id": "virtual-campus-ss-ces-api",
      "Service-Name": "SS-CES Service API",
    };

    const { data: res } = await axios({
      method: "get",
      url,
      headers,
    });

    const handleOptions = (item) => {
      return {
        active: false,
        value: item.value,
        text: item.label,
      };
    };

    const infoDegreeOnline = res.data.recordType.find(
      (item) => item.name === typesDegree.onlineDegree
    );

    const infoDegreeGraduate = res.data.recordType.find(
      (item) => item.name === typesDegree.graduateDegree
    );

    const infoDegreeTraditional = res.data.recordType.find(
      (item) => item.name === typesDegree.degreeTraditional
    );
    const optionsDegree = res.data.recordType;

    const stepsDegreeOnlineRequirement = res.data.stepsGuideOnlineDegree

    const stepsDegreeGraduateRequirement = res.data.stepsGuideGraduateDegree
    
    const links = res.data.filesLinks

    let optionTypeOnlineProgram = [];

    if(infoDegreeOnline && infoDegreeOnline?.programs) {
      optionTypeOnlineProgram = infoDegreeOnline.programs.map((item) => {
        return handleOptions(item);
      });
    }

    let optionTypeOnlinePayment = [];

    if(infoDegreeOnline && infoDegreeOnline?.paymentType) {
      optionTypeOnlinePayment = infoDegreeOnline.paymentType.map((item) => {
        return handleOptions(item);
      });
    }
    

    let optionTypeTraditionalPayment = [];

    if(infoDegreeOnline && infoDegreeOnline?.types) {
      optionTypeTraditionalPayment = infoDegreeOnline.types.map((item) => {
        return handleOptions(item);
      });
    }
    

    let optionTypeGraduateProgram = []

    if( infoDegreeGraduate && infoDegreeGraduate?.programs) {

      optionTypeGraduateProgram = infoDegreeGraduate.programs.map(
        (item) => {
          return handleOptions(item);
        }
      );

    }
    
    let optionTypeGraduatePayment = []

    if(infoDegreeGraduate && infoDegreeGraduate?.paymentType) {
      optionTypeGraduatePayment = infoDegreeGraduate.paymentType.map(
        (item) => {
          return handleOptions(item);
        }
      );
    }

    return {
      optionsDegree,
      optionTypeOnlineProgram,
      optionTypeOnlinePayment,
      optionTypeGraduateProgram,
      optionTypeGraduatePayment,
      optionTypeTraditionalPayment,
      stepsDegreeOnlineRequirement,
      stepsDegreeGraduateRequirement,
      links
    };
  } catch (error) {
    console.log(error);
    const { status, data } = error.response || { status: null, data: null };
    throw new Error(handleErrorGetProcedure(status, data));
  }
};

export const postDegreeHttp = async (data, recordId, files) => {
  try {
    let headers = filterEmpty(store.getState().headers);

    headers = {
      ...headers,
      "Service-Id": "virtual-campus-ss-ces-api",
      "Service-Name": "SS-CES Service API",
    };
    const url = `${baseUrl}${urlGetDegree}`;
    let oldFiles = [];

    Object.keys(files).forEach((key, index) => {
      if (files[key] !== null) {
        return oldFiles.push(files[key]);
      }
    });

    const filesFormat = oldFiles.map((doc) => {
      return {
        fileName: doc.name,
        fileBody: doc.body,
        fileType: doc.type
      };
    });
     
    const { data: res } = await axios({
      method: "post",
      headers,
      url,
      data: {
        phoneNumber: data.phone,
        chargeAccepted: true,
        recordTypeId: recordId,
        typeValue: typesModalityBanner.school === getValuesOfAuth().typeModality ? data?.selectTypePaymentDegree : null,
        paymentTypeValue: typesModalityBanner.school !== getValuesOfAuth().typeModality ? data?.selectTypePaymentDegree : null,
        //programTypeValue: data.programTypeValue,
        files: filesFormat,
      },
    });
    const { ticketNumber, transactionNumber } = res.data;
    return { ticketNumber, transactionNumber };
  } catch (error) {
    const { status, data } = error.response || { status: null, data: null };
    throw new Error(handleErrorPostProcedure(status, data));
  } 
};
