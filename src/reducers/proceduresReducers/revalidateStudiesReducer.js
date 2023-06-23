import { typesRequestErrors } from "../../constants/error.constant";
import { types } from "../../types/types";

const initialState = {
  information: {
    phone: null,
  },
  data: {
    phone: null,
    countryOfBirth: null,
    countryOfPriorStudies: null,
    schoolOfOrigin: null,
    street: null,
    number: null,
    neighborhood: null,
    cp: null,
    population: null,
    city: null,
    entity: null,
    comments: null,
    schoolPhone: null,
    schoolEmail: null,
    startDatePreviousLevel: null,
    endDatePreviousLevel: null
  },
  document: null,
  errors: {
    [typesRequestErrors.postRevalidateStudies]: {
      isError: false,
      msg: null,
    },
  },
};

export const revalidateStudiesReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.procedureRevalidateStudiesInfo:
      return {
        ...state,
        information: action.payload.information,
      };
    case types.procedureRevalidateStudiesDoc:
      return {
        ...state,
        document: action.payload.doc,
      };
    case types.procedureRevalidateStudiesOneData:
      return {
        ...state,
        data: {
          ...state.data,
          phone: action.payload.data.phone,
          countryOfBirth: action.payload.data.countryOfBirth,
          countryOfPriorStudies: action.payload.data.countryOfPriorStudies,
          schoolOfOrigin: action.payload.data.schoolOfOrigin,
          street: action.payload.data.street,
          number: action.payload.data.number,
          neighborhood: action.payload.data.neighborhood,
          cp: action.payload.data.cp,
          population: action.payload.data.population,
          city: action.payload.data.city,
          entity: action.payload.data.entity,
        }
      };
    case types.procedureRevalidateStudiesTwoData:
      return {
        ...state,
        data: {
          ...state.data,
          comments: action.payload.data.comments,
          schoolPhone: action.payload.data.schoolPhone,
          schoolEmail: action.payload.data.schoolEmail,
          startDatePreviousLevel: action.payload.data.startDatePreviousLevel,
          endDatePreviousLevel: action.payload.data.endDatePreviousLevel
        }
      };
    case types.paymentErrors:
      return revalidateStudiesErrors(state, action);
    case types.procedureRevalidateStudiesReset:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const revalidateStudiesErrors = (state, action) => {
  if (action.typeError === typesRequestErrors.postRevalidateStudies) {
    return {
      ...state,
      errors: {
        ...state.errors,
        [typesRequestErrors.postRevalidateStudies]:
          action.payload[typesRequestErrors.postRevalidateStudies],
      },
    };
  } else {
    return state;
  }
};
