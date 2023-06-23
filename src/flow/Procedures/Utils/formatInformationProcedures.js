import { typesDelivaryProcedures } from "../../../constants/Procedures.constant";
import { getValuesOfAuth } from "../../../helpers/auth";
import { store } from "../../../store/store";
import {
  typeCertificateProcedure,
  typesModality,
  typesModalityBanner,
} from "../../../types/typesProcedures";

const { texts } = store.getState().texts;

export const formatInfoModalStudyRecordProcedure = (info, data) => {
  let formatInfo = [];
  formatInfo.push(texts?.procedures?.modalProcedures?.phone + data.phone);
  formatInfo.push(
    texts?.procedures?.modalProcedures?.constant +
      info.optionsTypeRecord.filter((e) => e.value === data.selectTypeRecord)[0]?.text
  );

  if (getValuesOfAuth().modality === typesModality.withDelivery) { 
    formatInfo.push(
      texts?.procedures?.modalProcedures?.typeDelivery +
        info.optionsTypeDelivery.filter(
          (e) => e.value === data.selectTypeDelivery
        )[0]?.text
    );

    if (data.selectTypeDelivery === typesDelivaryProcedures.fisico) {
      formatInfo.push(
        texts?.procedures?.modalProcedures?.campusDelivery +
          info.optionsCampusDelivery.filter(
            (e) => e.value === data.selectCampusDelivery
          )[0]?.text
      );
    }
  }

  return formatInfo;
};

export const formatInfoModalCertificateStudyProcedure = (info, data) => {
  let formatInfo = [];
  formatInfo.push(texts?.procedures?.modalProcedures?.phone + data.phone);
  formatInfo.push(
    texts?.procedures?.modalProcedures?.certificate +
      info.optionsTypeCertificate.filter(
        (e) => e.value === data.selectTypeCertificate
      )[0]?.text
  );

  if (data.selectTypeCertificate === typeCertificateProcedure.total) {
    formatInfo.push(
      texts?.procedures?.modalProcedures?.typeSolicitude +
        info.optionsCertificateRequest.filter(
          (e) => e.value === data.selectCertificateRequest
        )[0]?.text
    );
  }

  if (getValuesOfAuth().modality === typesModality.withDelivery) {
    formatInfo.push(
      texts?.procedures?.modalProcedures?.typeDelivery +
        info.optionsTypeDelivery.filter(
          (e) => e.value === data.selectTypeDelivery
        )[0]?.text
    );

    if (data.selectTypeDelivery === typesDelivaryProcedures.fisico) {
      formatInfo.push(
        texts?.procedures?.modalProcedures?.campusDelivery +
          info.optionsCampusDelivery.filter(
            (e) => e.value === data.selectCampusDelivery
          )[0]?.text
      );
    }
  }

  return formatInfo;
};

export const formatDocumentsModalCertificateStudyProcedure = (docs) => {
  let formatDoc = [];
  Object.keys(docs.value).forEach((key) => {
    if (docs.value[key]?.name && docs.value[key].name !== null) {
      return formatDoc.push(docs.value[key].name);
    }
  });
  return formatDoc;
};

export const formatInfoModalAcademicRecordProcedure = (info, data) => {
  let formatInfo = [];
  formatInfo.push(texts?.procedures?.modalProcedures?.phone + data.phone);

  if (getValuesOfAuth().modality === typesModality.withDelivery) {
    formatInfo.push(
      texts?.procedures?.modalProcedures?.typeDelivery +
        info.optionsTypeDelivery.filter(
          (e) => e.value === data.selectTypeDelivery
        )[0]?.text
    );
    if (data.selectTypeDelivery === typesDelivaryProcedures.fisico) {
      formatInfo.push(
        texts?.procedures?.modalProcedures?.campusDelivery +
          info.optionsCampusDelivery.filter(
            (e) => e.value === data.selectCampusDelivery
          )[0]?.text
      );
    }
  }

  return formatInfo;
};

export const formatInfoModalEquivalenceStudiesProcedure = (data) => {
  let formatInfo = [];
  formatInfo.push(texts?.procedures?.modalProcedures?.phone + data.phone);
  return formatInfo;
};

export const formatDocsModalDegreeProcedure = (docs) => {
  let formatDoc = [];

  Object.keys(docs).forEach((key) => {
    if(docs[key]?.name && docs[key]?.name !== null) {
      return formatDoc.push(docs[key]?.name);
    }
  });
  return formatDoc;
};

export const formatInfoModalDegreeProcedure = (data, info) => {
  let formatInfo = [];
  formatInfo.push(texts?.procedures?.modalProcedures?.phone + data.phone);
  // formatInfo.push(
  //   texts?.procedures?.modalProcedures?.programType +
  //     info.optionsTypeProgramDegree.find(
  //       (e) => e.value === data?.selectTypeProgramDegree
  //     )?.text
  // );
  const arr = typesModalityBanner.school === getValuesOfAuth().typeModality ? info.optionTypeTraditionalPayment:info.optionsTypePaymentDegree
  const text = typesModalityBanner.school === getValuesOfAuth().typeModality ? 'Tipo de titulación: ':texts?.procedures?.modalProcedures?.paymentType
  formatInfo.push(
    text +
      arr.find(
        (e) => e.value === data?.selectTypePaymentDegree
      )?.text
  );
  return formatInfo;
};

export const formatInfoModalGovernmentEmployeeProcedure = (data) => {
  let formatInfo = [];
  formatInfo.push(texts?.procedures?.modalProcedures?.phone + data.phone);
  return formatInfo;
};

export const formatDocumentsModalEquivalenceStudiesProcedure = (docs) => {
  let formatDoc = [];

  Object.keys(docs.value).forEach((key) => {
    if (docs.value[key]?.name && docs.value[key]?.name !== null) {
      return formatDoc.push(docs.value[key].name);
    }
  });
  return formatDoc;
};

export const formatDocumentsGovernmentEmployeeProcedure = (docs) => {
  let formatDoc = [];

  Object.keys(docs.value).forEach((key) => {
    if (docs.value[key]?.name && docs.value[key].name !== null) {
      return formatDoc.push(docs.value[key].name);
    }
  });
  return formatDoc;
};

export const formatInfoModalReinstatementProcedure = (data) => {
  let formatInfo = [];
  formatInfo.push(texts?.procedures?.modalProcedures?.phone + data.phone);
  return formatInfo;
};

export const formatDocumentsModalReinstatementProcedure = (docs) => {
  let formatDoc = [];
  Object.keys(docs.value).forEach((key) => {
    if (docs.value[key]?.name && docs.value[key].name !== null) {
      return formatDoc.push(docs.value[key].name);
    }
  });
  return formatDoc;
};

export const formatDocumentsModalProcedure = (docs) => {
  let formatDoc = [];

  Object.keys(docs.value).forEach((key) => {
    if (docs.value[key]?.name && docs.value[key].name !== null) {
      return formatDoc.push(docs.value[key].name);
    }
  });
  return formatDoc;
};

export const formatInfoModalUlaInstitutionSocialServiceProcedure = (info) => {
  let formatInfo = [];
  formatInfo.push(texts?.procedures?.modalProcedures?.phone + info?.phone); 
  formatInfo.push(
    texts?.procedures?.modalProcedures?.institutionName + info?.institutionName
  );
  formatInfo.push(
    texts?.procedures?.modalProcedures?.programManager + info?.programManager
  );

  return formatInfo;
};

export const formatInfoModalElderOrIllProcedure = (data) => {
  let formatInfo = [];
  formatInfo.push(texts?.procedures?.modalProcedures?.phone + data.phone);
  return formatInfo;
};

export const formatInfoModalRegisterProgramOrInstituteProcedure = (data) => {
  let formatInfo = [];
  formatInfo.push(texts?.procedures?.modalProcedures?.phone + data.phone);
  return formatInfo;
};

export const formatInfoModalScholarshipProcedure = (data) => {
  let formatInfo = [];
  formatInfo.push(texts?.procedures?.modalProcedures?.phone + data.phone);
  return formatInfo;
};

export const formatDocumentsModalScholarshipProcedure = (docs) => {
  let formatDoc = Object.entries(docs.value).reduce((prev,current) => {
    return typeof current[1] === 'object' ? [...prev,current[1].name]: [...prev]
  },[]);
  return formatDoc;
};

export const formatDocumentsModalAdmissionCertificateProcedure = (docs) => {
  let formatDoc = [];

  Object.keys(docs.value).forEach((key) => {
    if (docs.value[key]?.name && docs.value[key].name !== null) {
      return formatDoc.push(docs.value[key].name);
    }
  });
  return formatDoc;
};

export const formatInfoModalAdmissionCertificateProcedure = (info) => {
  let formatInfo = [];
  formatInfo.push(texts?.procedures?.modalProcedures?.phone + info.phone);
  formatInfo.push(texts?.procedures?.modalProcedures?.countryOfBirth + info?.countryOfBirth);
  formatInfo.push(texts?.procedures?.modalProcedures?.countryOfPriorStudies + info?.countryOfPriorStudies);
  formatInfo.push(texts?.procedures?.modalProcedures?.schoolOfOrigin + info?.schoolOfOrigin);
  formatInfo.push(texts?.procedures?.modalProcedures?.dateStudiesStarted + info?.dateStudiesStarted);
  formatInfo.push(texts?.procedures?.modalProcedures?.dateStudiesFinished + info?.dateStudiesFinished);
  return formatInfo;
};

export const formatInfoModalRevalidateStudiesProcedure = (info) => {
  let formatInfo = [];
  formatInfo.push(texts?.procedures?.modalProcedures?.phone + info.phone);
  formatInfo.push(
    texts?.procedures?.modalProcedures?.countryRevalidate + info?.countryOfBirth
  );
  formatInfo.push(
    texts?.procedures?.modalProcedures?.countryStudyRevalidate + info?.countryOfPriorStudies
  );
  formatInfo.push(
    texts?.procedures?.modalProcedures?.nameSchoolRevalidate + info?.schoolOfOrigin
  );
  formatInfo.push(
    texts?.procedures?.modalProcedures?.addressRevalidate + info?.street + " " + info?.number + " " + info?.neighborhood + " " + info?.cp + " " + info?.population + " " + info?.city + " " + info?.entity
  );
  formatInfo.push(
    texts?.procedures?.modalProcedures?.phoneSchoolRevalidate + info?.schoolPhone 
  );
  formatInfo.push(
    texts?.procedures?.modalProcedures?.emailSchoolRevalidate + info?.schoolEmail
  );
  return formatInfo;
};

export const formatDocumentsModalRevalidateStudiesProcedure = (docs) => {
  let formatDoc = [];

  Object.keys(docs.value).forEach((key) => {
    if (docs.value[key].name !== null) {
      return formatDoc.push(docs.value[key].name);
    }
  });
  return formatDoc;
};

export const formatDocumentsModalProgramChangeProcedure = (docs) => {
  let formatDoc = [];

  Object.keys(docs.value).forEach((key) => {
    if (docs.value[key]?.name && docs.value[key].name !== null) {
      return formatDoc.push(docs.value[key].name);
    }
  });
  return formatDoc;
};

export const formatInfoModalProgramChangeProcedure = (data) => {
  let formatInfo = [];
  formatInfo.push(texts?.procedures?.modalProcedures?.phone + data.phone);
  return formatInfo;
};