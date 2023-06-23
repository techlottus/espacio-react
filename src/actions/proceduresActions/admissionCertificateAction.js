import { types } from "../../types/types";

export const setAdmissionCertificateInformation = (info) => {
  return {
    type: types.procedureAdmissionCertificateInfo,
    payload: {
      information: {
        ...info,
      },
    },
  };
};

export const setAdmissionCertificateData = (data) => {
  return {
    type: types.procedureAdmissionCertificateData,
    payload: {
      data: {
        comments: data.comments || null,
        phone: data.phone || null,
        countryOfBirth: data.countryOfBirth || null,
        countryOfPriorStudies: data.countryOfPriorStudies || null,
        schoolOfOrigin: data.schoolOfOrigin || null,
        dateStudiesStarted: data.dateStudiesStarted || null,
        dateStudiesFinished: data.dateStudiesFinished || null,
      },
    },
  };
};

export const setAdmissionCertificateDocuments = (file) => {
  return {
    type: types.procedureAdmissionCertificateDoc,
    payload: {
      doc: file,
    },
  };
};

export const setAdmissionCertificateReset = () => {
  return {
    type: types.procedureAdmissionCertificateReset,
    payload: {},
  };
};
