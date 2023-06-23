import { typesRequestErrors } from "../constants/error.constant";
import { types } from "../types/types";

const initialState = {
  profile: null,
  movements: null,
  errors: {
    [typesRequestErrors.getAccountStatus]: {
      isError: false,
      msg: null,
    },
    [typesRequestErrors.getProgramsAccountStatus]: {
      isError: false,
      msg: null,
    },
    [typesRequestErrors.getMovementsOfPeriosAccountAccountStatus]: {
      isError: false,
      msg: null,
    },
  },
  programs: null,
  success: {
    isSuccess: false,
    msg: null,
  },
  debitPeriods: null,
};

export const accountStatusReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.accountStatusSetProfile:
      return {
        ...state,
        profile: action.payload.profile,
      };
    case types.accountMovements:
      return {
        ...state,
        movements: action.payload.movements,
      };
    case types.accountStatusPrograms:
      return {
        ...state,
        programs: action.payload.programs,
      };
    case types.dashboardErrors:
      return accountStatusErrorReducer(state, action);
    case types.accountStatusError:
      return accountStatusErrorReducer(state, action);
    case types.accountStatusReset:
      return {
        ...initialState,
      };
    case types.accountStatussSetDebitPeriod:
      return {
        ...state,
        debitPeriods: action.payload.debitPeriods,
      };

    default:
      return state;
  }
};

const accountStatusErrorReducer = (state, action) => {
  switch (action.typeError) {
    case typesRequestErrors.getAccountStatus:
      return {
        ...state,
        erros: {
          ...state.errors,
          [typesRequestErrors.getAccountStatus]:
            action.payload[typesRequestErrors.getAccountStatus],
        },
      };
    case typesRequestErrors.getProgramsAccountStatus:
      return {
        ...state,
        errors: {
          ...state.errors,
          [typesRequestErrors.getProgramsAccountStatus]:
            action.payload[typesRequestErrors.getProgramsAccountStatus],
        },
      };
    case typesRequestErrors.getMovementsOfPeriosAccountAccountStatus:
      return {
        ...state,
        errors: {
          ...state.errors,
          [typesRequestErrors.getMovementsOfPeriosAccountAccountStatus]:
            action.payload[typesRequestErrors.getMovementsOfPeriosAccountAccountStatus],
        },
      };
    default:
      return state;
  }
};
