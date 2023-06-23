import { typesRequestErrors } from "../../constants/error.constant";
import { types } from "../../types/types";

const initialState = {
  data: [],
  degreeInProgress: {
    information: {
      phone: null,
      optionTypeTraditionalPayment: [],
      optionsTypeProgramDegree: [],
      optionsTypePaymentDegree: [],
      filesLinks: null,
    },
    data: {
      selectTypeProgramDegree: null,
      selectTypePaymentDegree: null,
      phone: null,
    },
  },
  degreeGraduate: {
    information: {
      phone: null,
      optionsTypeProgramDegree: [],
      optionsTypePaymentDegree: [],
    },
    data: {
      selectTypeProgramDegree: null,
      selectTypePaymentDegree: null,
      phone: null,
    },
  },
  stepsDegreeOnlineRequirement: [],
  stepsDegreeGraduateRequirement: [],
  degreeTypeId: null,
  errors: {
    [typesRequestErrors.postDegree]: {
      isError: false,
      msg: null,
    },
  },
};

export const degreeReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.procedureDegreeSetData:
      return {
        ...state,
        data: action.payload.data
      };
    case types.procedureDegreeOnlineInfo:
      return {
        ...state,
        degreeInProgress: {
          ...state.degreeInProgress,
          information: action.payload.information,
        },
      };
    case types.procedureDegreeGraduateInfo:
      return {
        ...state,
        degreeGraduate: {
          ...state.degreeGraduate,
          information: action.payload.information,
        },
      };
    case types.procedureDegreeOnlineData:
      return {
        ...state,
        degreeInProgress: {
          ...state.degreeInProgress,
          data: action.payload.data,
        },
      };
    case types.procedureDegreeGraduateData:
      return {
        ...state,
        degreeGraduate: {
          ...state.degreeGraduate,
          data: action.payload.data,
        },
      };
    case types.procedureDegreeModalOnline:
      return {
        ...state,
        stepsDegreeOnlineRequirement:
          action.payload.stepsDegreeOnlineRequirement,
      };
    case types.procedureDegreeModalGraduate:
      return {
        ...state, 
        stepsDegreeGraduateRequirement:
          action.payload.stepsDegreeGraduateRequirement,
      };
     case types.procedureDegreeSetTypeId:
      return {
        ...state,
        degreeTypeId: action.payload.id
      };
    case types.paymentErrors:
      return degreeErrors(state, action);
    case types.procedureDegreeReset:
      return {
        ...initialState,
        data: [...state?.data],
        degreeInProgress: {
          information: {
            ...state.degreeInProgress.information
          },
          data: {
            selectTypeProgramDegree: null,
            selectTypePaymentDegree: null,
            phone: null,
          },
        },
        degreeGraduate: {
          information: {
            ...state.degreeGraduate.information
          },
          data: {
            selectTypeProgramDegree: null,
            selectTypePaymentDegree: null,
            phone: null,
          },
        },
        stepsDegreeOnlineRequirement: [
          ...state.stepsDegreeOnlineRequirement
        ],
        stepsDegreeGraduateRequirement: [
          ...state.stepsDegreeGraduateRequirement
        ],
        errors: {
          ...state.errors
        }

      };
    default:
      return state;
  }
};

const degreeErrors = (state, action) => {
  if (action.typeError === typesRequestErrors.postDegree) {
    return {
      ...state,
      errors: {
        ...state.errors,
        [typesRequestErrors.postDegree]:
          action.payload[typesRequestErrors.postDegree],
      },
    };
  } else {
    return state;
  }
};
