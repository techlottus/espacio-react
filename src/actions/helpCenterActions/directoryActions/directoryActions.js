import { types } from "../../../types/types";


export const setErrorDirectoryHelp = (typeError, isError, msg) => {
  return {
    type: types.helpCenterDirectoryError,
    typeError,
    payload: {
      [typeError]: {
        isError,
        msg,
      },
    },
  };
};

export const setDirectoryHelpData = (data) => {
  return {
    type: types.helpCenterDirectoryData, 
    payload: {
      data
    }
  }

}

export const setResetDirectoryHelp = () => {
  return {
    type: types.helpCenterDirectoryReset, 
    payload: {}
  }
}

export const setDirectoryCoordinatorsHelp = (data) => {
  return {
    type: types.helpCenterDirectoryCoordinators,
    payload: {
      optionCoordinators: data,
    },
  };
};

export const setDirectoryAdvisorsHelp = (data) => {
  return {
    type: types.helpCenterDirectoryAdvisors,
    payload: {
      optionAdvisors: data,
    },
  };
};


