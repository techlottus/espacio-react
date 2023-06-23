import { typesRequestErrors } from "../../constants/error.constant";
import { types } from "../../types/types";

const initialState = {
  data: null,
  information: {
    phone: null,
  },
  socialTypeId: null,
  errors: {
    [typesRequestErrors.getProcedureSocialService]: {
      isError: false,
      msg: null,
    },
  },
};

export const socialServiceReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.procedureSocialServiceData:
      return {
        ...state,
        data: action.payload.data,
      };
    case types.procedureSocialServiceInfo:
      return {
        ...state,
        information: action.payload.information,
      };
    case types.procedureSocialServiceTypeId:
      return {
        ...state,
        socialTypeId: action.payload.id,
      };
    case types.procedureSocialServiceError:
      return socialServiceErrorReducer(state, action);
    case types.procedureSocialServiceReset:
      return {
        ...state,
        socialTypeId: null,
        errors: {
          ...initialState.errors
        }
      };
    default:
      return state;
  }
};

const socialServiceErrorReducer = (state, action) => {
  switch (action.typeError) {
    case typesRequestErrors.getProcedureSocialService:
      return {
        ...state,
        errors: {
          ...state.errors,
          [typesRequestErrors.getProcedureSocialService]:
            action.payload[typesRequestErrors.getProcedureSocialService],
        },
      };

    default:
      return state;
  }
};
