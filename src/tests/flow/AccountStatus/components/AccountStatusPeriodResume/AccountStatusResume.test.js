import React from "react";
import { mount } from "enzyme";
import AccountStatusResume from "../../../../../flow/AccountStatus/components/AccountStatusResume.js/AccountStatusResume";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { typesRequestErrors } from "../../../../../constants/error.constant";
import { Feedback } from "../../../../../components/Feedback/Feedback";
import { act } from "react-dom/test-utils";
import { fireEvent } from "@testing-library/dom";
import { Button } from "../../../../../components/Button/Button";
import { BrowserRouter } from "react-router-dom";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

window.scrollTo = jest.fn();

let initState = {
  accountStatus: {
    profile: null,
    movements: null,
    errors: {
      [typesRequestErrors.getAccountStatus]: {
        isError: false,
        msg: null,
      },
      [typesRequestErrors.getAccountMovements]: {
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
  },
  texts: {
    accountStatus: {
      errorMessage: "hola",
      resumeTitle: "hola",
    },
  },
};

const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };

let store = mockStore(initState);
const handleMount = (initState) => {
  store = mockStore(initState);
  return mount(
    <Provider store={store}>
      <BrowserRouter>
        <AccountStatusResume history={historyMock} />
      </BrowserRouter>
    </Provider>
  );
};

describe("Test <AccountStatusResume/>", () => {
  beforeEach(() => {
    store = mockStore(initState);
  });

  test("should init component", () => {
    const wrapper = handleMount(initState);
    expect(wrapper).toMatchSnapshot();
  });

  test("should show error", () => {
    initState = {
      ...initState,
      accountStatus: {
        ...initState.accountStatus,
        errors: {
          ...initState.accountStatus.errors,
          [typesRequestErrors.getAccountStatus]: {
            isError: true,
            msg: "Error",
          },
        },
      },
    };
    const wrapper = handleMount(initState);
  });

  describe("should handleResume", () => {
    test("ToBeEmpty", () => {
      initState = {
        ...initState,
        accountStatus: {
          ...initState.accountStatus,
          debitPeriods: [],
        },
      };
      const wrapper = handleMount(initState);
      expect(wrapper.find("ScreenEmpty").exists()).toBe(true);
    });
    test("ToBeFull", () => {
      initState = {
        ...initState,
        accountStatus: {
          ...initState.accountStatus,
          debitPeriods: [
            {
              periodCode: "202146",
              periodDescription: "DGETI  F21-M21",
              startDate: "2021-01-25",
              endDate: "2021-05-17",
              debtAmount: 5960.0,
            },
            {
              periodCode: "202147",
              periodDescription: "DGETI  J21-A21",
              startDate: "2021-05-24",
              endDate: "2021-09-08",
              debtAmount: 100.0,
            },
          ],
        },
      };
      const wrapper = handleMount(initState);
      expect(wrapper.find("AccountStatusTable").exists()).toBe(true);
    });
    test("ToBeNull", () => {
      initState = {
        ...initState,
        accountStatus: {
          ...initState.accountStatus,
          debitPeriods: null,
        },
      };
      const wrapper = handleMount(initState);
      expect(wrapper).toMatchSnapshot();
    });
  });

  test("close feedback delete error", () => {
    initState = {
      ...initState,
      accountStatus: {
        ...initState.accountStatus,
        errors: {
          [typesRequestErrors.getAccountStatus]: {
            isError: true,
            msg: "error en cuenta",
          },
        },
      },
    };
    const wrapper = handleMount(initState);
  });

  test("should download account state", () => {
    initState = {
      ...initState,
      accountStatus: {
        ...initState.accountStatus,
        errors: {
          [typesRequestErrors.getAccountStatus]: {
            isError: true,
            msg: "error en cuenta",
          },
        },
      },
    };
    const wrapper = handleMount(initState);

    act(() => {
      wrapper.find(".downloadbtn").find(Button).props().onClick();
    });
    wrapper.update();
  });

  test("should push ", () => {
    initState = {
      ...initState,
      accountStatus: {
        ...initState.accountStatus,
      },
    };
    const wrapper = handleMount(initState);
    act(() => {
      wrapper
        .find(".accountstatusresumebtn")
        .find(Button)
        .last()
        .props()
        .onClick();
    });
    wrapper.update();
    console.log(historyMock.push.mock);
    //expect(historyMock.push.mock.calls[0][0]).toEqual('/account-status-invoices-query');
  });

  test("should", () => {
    initState = {
      ...initState,
      accountStatus: {
        ...initState.accountStatus,
        profile: {
          fullName: "Jorge Hernandez",
          enrollmentNumber: "200029578",
          institute: "UTC DISTANCIA",
          academicLevel: "LICENCIATURA 334",
          program: "ADMINISTRACIÓN DE EMPRESAS",
        },
      },
    };
    const wrapper = handleMount(initState);
  });

  test("should", () => {
    initState = {
      ...initState,
      accountStatus: {
        ...initState.accountStatus,
        debitPeriods: []
      },
    };
    const wrapper = handleMount(initState);
  });
});
