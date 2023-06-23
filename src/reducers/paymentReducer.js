import { types } from "../types/types";
import { typesRequestErrors } from "../constants/error.constant";

const initialState = {
  isInvoice: true,
  concepts: null,
  selectConcept: null,
  invoices: null,
  editForm: null,
  selectInvoice: null,
  methods: [],
  selectMethod: null,
  pathExit: null,
  zip: null,
  conceptDefault: null,
  cardId: null,
  cards: null,
  taxRegime: null,
  credit: {
    creditNumber: null,
    creditName: null,
    expireDate: null,
    securityCode: null,
  },
  stripePayment: {
    amount: null,
    cardId: null,
    transaction: null,
  },
  searchAmount: null,
  totalPayable: null,
  errors: {
    [typesRequestErrors.getConcepts]: {
      isError: false,
      msg: null,
    },
    [typesRequestErrors.getInvoices]: {
      isError: false,
      msg: null,
    },
    [typesRequestErrors.postInvoices]: {
      isError: false,
      msg: null,
    },
    [typesRequestErrors.deleteInvoice]: {
      isError: false,
      msg: null,
    },
    [typesRequestErrors.putInvoices]: {
      isError: false,
      msg: null,
    },
    [typesRequestErrors.emptyConcepts]: {
      isError: false,
      msg: null,
    },
    [typesRequestErrors.deleteConcept]: {
      isError: false,
      msg: null,
    },
    [typesRequestErrors.bankDepositError]: {
      isError: false,
      msg: null,
    },
    [typesRequestErrors.postCreditCard]: {
      isError: false,
      msg: null,
    },
    [typesRequestErrors.getCreditCards]: {
      isError: false,
      msg: null,
    },
    [typesRequestErrors.postStripePayment]: {
      isError: false,
      msg: null,
    },
    [typesRequestErrors.deleteCreditCard]: {
      isError: false,
      msg: null,
    },
  },
  download: null,
};

export const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.paymentGetConcepts:
      return {
        ...state,
        concepts: action.payload.concepts,
      };
    case types.paymentSetTotalPayable:
      return {
        ...state,
        totalPayable: action.payload.total,
      };
    case types.paymentSetConcept:
      return {
        ...state,
        selectConcept: action.payload.selectConcept,
      };
    case types.paymentConceptDefault:
      return {
        ...state,
        conceptDefault: action.payload.conceptDefault,
      };
    case types.paymentGetInvoices:
      return {
        ...state,
        invoices: action.payload.invoices,
      };
    case types.paymentSearchAmount:
      return {
        ...state,
        searchAmount: action.payload.searchAmount,
      };
    case types.paymentSetInvoice:
      return {
        ...state,
        selectInvoice: action.payload.selectInvoice,
      };
    case types.paymentGetMethods:
      return {
        ...state,
        methods: action.payload.methods,
      };
    case types.paymentSetMethod:
      return {
        ...state,
        selectMethod: action.payload.selectMethod,
      };
    case types.paymentEditForm:
      return {
        ...state,
        editForm: action.payload.editForm,
      };
    case types.paymentSetIsInvoice:
      return {
        ...state,
        isInvoice: action.payload.isInvoice,
      };
    case types.paymentGetDownload:
      return {
        ...state,
        download: action.payload.download,
      };
    case types.paymentPathExit:
      return {
        ...state,
        pathExit: action.payload.pathExit,
      };
    case types.getZip:
      return {
        ...state,
        zip: action.payload.zip,
      };
    case types.paymentCreditCard:
      return {
        ...state,
        credit: action.payload.credit,
      };
    case types.paymentSetCardId:
      return {
        ...state,
        cardId: action.payload.cardId,
      };
    case types.paymentStripe:
      return {
        ...state,
        stripePayment: action.payload.stripePayment,
      };
    case types.paymentSetCards:
      return {
        ...state,
        cards: action.payload.cards,
      };
    case types.paymentTaxRegime:
      return {
        ...state,
        taxRegime: action.payload.taxRegime,
      };
    case types.paymentErrors:
      return paymentTypesErrorsReducer(state, action);
    case types.paymentReset:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const paymentTypesErrorsReducer = (state, action) => {
  switch (action.typeError) {
    case typesRequestErrors.getConcepts:
      return {
        ...state,
        errors: {
          ...state.errors,
          [typesRequestErrors.getConcepts]:
            action.payload[typesRequestErrors.getConcepts],
        },
      };
    case typesRequestErrors.getInvoices:
      return {
        ...state,
        errors: {
          ...state.errors,
          [typesRequestErrors.getInvoices]:
            action.payload[typesRequestErrors.getInvoices],
        },
      };
    case typesRequestErrors.postInvoices:
      return {
        ...state,
        errors: {
          ...state.errors,
          [typesRequestErrors.postInvoices]:
            action.payload[typesRequestErrors.postInvoices],
        },
      };
    case typesRequestErrors.deleteInvoice:
      return {
        ...state,
        errors: {
          ...state.errors,
          [typesRequestErrors.deleteInvoice]:
            action.payload[typesRequestErrors.deleteInvoice],
        },
      };
    case typesRequestErrors.putInvoices:
      return {
        ...state,
        errors: {
          ...state.errors,
          [typesRequestErrors.putInvoices]:
            action.payload[typesRequestErrors.putInvoices],
        },
      };
    case typesRequestErrors.getZip:
      return {
        ...state,
        errors: {
          ...state.errors,
          [typesRequestErrors.getZip]:
            action.payload[typesRequestErrors.getZip],
        },
      };
    case typesRequestErrors.emptyConcepts:
      return {
        ...state,
        errors: {
          ...state.errors,
          [typesRequestErrors.emptyConcepts]:
            action.payload[typesRequestErrors.emptyConcepts],
        },
      };
    case typesRequestErrors.deleteConcept:
      return {
        ...state,
        errors: {
          ...state.errors,
          [typesRequestErrors.deleteConcept]:
            action.payload[typesRequestErrors.deleteConcept],
        },
      };
    case typesRequestErrors.bankDepositError:
      return {
        ...state,
        errors: {
          ...state.errors,
          [typesRequestErrors.bankDepositError]:
            action.payload[typesRequestErrors.bankDepositError],
        },
      };
    case typesRequestErrors.postCreditCard:
      return {
        ...state,
        errors: {
          ...state.errors,
          [typesRequestErrors.postCreditCard]:
            action.payload[typesRequestErrors.postCreditCard],
        },
      };
    case typesRequestErrors.deleteCreditCard:
      return {
        ...state,
        errors: {
          ...state.errors,
          [typesRequestErrors.deleteCreditCard]:
            action.payload[typesRequestErrors.deleteCreditCard],
        },
      };
    case typesRequestErrors.getCreditCards:
      return {
        ...state,
        errors: {
          ...state.errors,
          [typesRequestErrors.getCreditCards]:
            action.payload[typesRequestErrors.getCreditCards],
        },
      };
    case typesRequestErrors.postStripePayment:
      return {
        ...state,
        errors: {
          ...state.errors,
          [typesRequestErrors.postStripePayment]:
            action.payload[typesRequestErrors.postStripePayment],
        },
      };
    default:
      return state;
  }
};
