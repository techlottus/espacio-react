import { types } from "../../../types/types";


export const setErrorHelpCenter = (typeError, isError, msg) => {
  return {
    type: types.helpCenterFaqsError,
    typeError,
    payload: {
      [typeError]: {
        isError,
        msg,
      },
    },
  };
};

export const setFaqsHelpSearch = (tickets,faqs) => {
  return {
    type: types.helpCenterFaqsSearch, 
    payload: {
      search: {
        tickets,
        faqs
      }
    }
  }

}

export const setFaqsHelpData = (data) => {
  return {
    type: types.helpCenterFaqsData, 
    payload: {
      data: [...data]
    }
  }

}

export const setResetFaqsHelp = () => {
  return {
    type: types.helpCenterFaqsReset, 
    payload: {}
  }
}


