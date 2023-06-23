import { types } from "../../../types/types";

export const setTechnicalLibraryAndCollectionsInformation = (info) => {
  return {
    type: types.helpCenterTechnicalInfo,
    payload: {
      information: {
        ...info,
      },
    },
  };
};

export const setTechnicalLibraryAndCollectionsDocument = (file) => {
  return {
    type: types.helpCenterTechnicalDoc,
    payload: {
      document: file,
    },
  };
};

export const setTechnicalLibraryAndCollectionsData = (data) => {
  return {
    type: types.helpCenterTechnicalData,
    payload: {
      data: {
        selectCheckboxes: data.selectedCheckboxes || null,
        activity: data.activity || null,
        teacher: data.teacher || null,
        subject: data.subject || null,
        description: data.description || null,
      },
    },
  };
};

export const setTechnicalLibraryAndCollectionsReset = () => {
  return {
    type: types.helpCenterTechnicalReset,
    payload: {},
  };
};

export const setErrorsTechnicalLibraryAndCollectionsActivities = (typeError,isError,msg) => {
  return {
    type: types.helpCenterTechnicalError,
    typeError,
    payload: {
      [typeError]: {
        isError,
        msg
      }
    }
  }
}
