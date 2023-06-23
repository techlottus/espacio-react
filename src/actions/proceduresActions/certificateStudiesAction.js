import { types } from "../../types/types";

export const setCertificateStudyInformation = (info) => {
  return {
    type: types.procedureCertificateStudyInfo,
    payload: {
      information: {
        ...info,
      },
    },
  };
};

export const setCertificateStudyDocuments = (file) => {
  return {
    type: types.procedureCertificateStudyDoc,
    payload: {
      doc: file,
    },
  };
};

export const setCertificateStudyData = (data) => {
  return {
    type: types.procedureCertificateStudyData,
    payload: {
      data: {
        selectCampusDelivery: data.selectCampusDelivery || null,
        selectCertificateRequest: data.selectCertificateRequest || null,
        selectTypeCertificate: data.selectTypeCertificate || null,
        selectTypeDelivery: data.selectTypeDelivery || null,
        comments: data.comments || null,
        phone: data.phone || null, 
      },
    },
  };
};

export const setCertificateStudyReset = () => {
  return {
    type: types.procedureCertificateStudyReset,
    payload: {},
  };
};


export const setCertificateStudyExtra = (extra) => {
  return {
    type: types.procedureCertificateStudyExtra,
    payload:{
      extra:{
        cost: extra.cost || null,
        detailId: extra.detailId || null
      }
    }
  }
}