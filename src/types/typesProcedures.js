import { typeflowsProcedures } from "../constants/Procedures.constant";
import env from "../enviroment/environment";
import {
  cardCertProceduresTag,
  cardConstProceduresTag,
  cardEquiProceduresTag,
  cardHistProceduresTag,
  cardReinsProceduresTag,
} from "../tagging/flows/procedures/proceduresTag";

export const typesModality = {
  withDelivery: "withDelivery",
  withoutDelivery: "withoutDelivery",
};

const getTypeCertificateProcedure = () => {
  return {
    parcial: "CERC11P7",
    total: "CERC11T5",
  };
};

export const typeCertificateProcedure = {
  parcial: getTypeCertificateProcedure().parcial,
  total: getTypeCertificateProcedure().total,
};

export const typesModalityBanner = {
  school: "Escolarizada",
  toDistance: "A Distancia",
  executive: "Ejecutiva",
};

export const typeProcedure = {
  cre: {
    id: "1",
    icon: "",
    type: typeflowsProcedures.credential,
    tag: "",
  },
  COE: {
    id: "2",
    path: "/procedures-flows/study-record/information",
    icon: "description",
    type: typeflowsProcedures.studyRecord,
    tag: cardConstProceduresTag,
  },
  CEE: {
    id: "3",
    path: "/procedures-flows/certificate-study/information",
    icon: "star",
    type: typeflowsProcedures.certificateStudy,
    tag: cardCertProceduresTag,
  },
  HIA: {
    id: "4",
    path: "/procedures-flows/academic-history/information",
    icon: "event_available",
    type: typeflowsProcedures.academyHistory,
    tag: cardHistProceduresTag,
  },
  EQU: {
    id: "5",
    path: "/procedures-flows/equivalence-study/information",
    icon: "search",
    type: typeflowsProcedures.equivalenceStudy,
    card: cardEquiProceduresTag,
  },
  REI: {
    id: "6",
    path: "/procedures-flows/reinstatement/information",
    icon: "grading",
    type: typeflowsProcedures.reinstatement,
    card: cardReinsProceduresTag,
  },
  titulacion: {
    id: "7",
    path: null,
    icon: "school",
    type: typeflowsProcedures.degree,
  },
  servicioSocial: {
    id: "8",
    path: null,
    icon: "school",
    type: typeflowsProcedures.socialService,
  },
  becas: {
    id: "9",
    path: "/procedures-flows/scholarship/information",
    icon: "request_quote",
    type: typeflowsProcedures.scholarship,
  },
  revalidacion: {
    id: "10",
    path: "/procedures-flows/revalidate-study/information",
    icon: "loop",
    type: typeflowsProcedures.revalidateStudy,
  },
  actaAdmision: {
    id: "11",
    path: "/procedures-flows/admission-certificate/information",
    icon: "account_box",
    type: typeflowsProcedures.admissionCertificate,
  },
  cambioPrograma: {
    id: "12",
    path: "/procedures-flows/program-change/information",
    icon: "sync_alt",
    type: typeflowsProcedures.programChange,
  },
  historiaAcademica: { 
    id: "13",
    icon: "event_available",
    type: typeflowsProcedures.reviewAcademicHistory,
    urlOpenOut: env.reviewAcademicHistory,
  },
};

export const typesDegree = {
  degreeTraditional: "traditionalDegree",
  onlineDegree: "onlineDegree",
  graduateDegree: "graduateDegree",
};
