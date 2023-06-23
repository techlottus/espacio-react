import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
import AccountStatus from "../../../flow/AccountStatus/AccountStatus";
import { textDashboardMock } from "../../../fixtures/dashboardFixture";
import { textsAccountStatusMock } from "../../../fixtures/accountStatusFixture";
import { typesRequestErrors } from "../../../constants/error.constant";
import { act } from "react-dom/test-utils";
import { Breadcrumb } from "../../../components/Breadcrumb/Breadcrumb";

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
      ...textsAccountStatusMock
    },
    dashboard: {
      ...textDashboardMock
    }
  }
};

const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };

let store = mockStore(initState);
const handleMount = (initState) => {
  store = mockStore(initState);
  return mount(
    <Provider store={store}>
      <BrowserRouter>
        <AccountStatus history={historyMock} />
      </BrowserRouter>
    </Provider>
  );
};

describe("Test <AccountStatus/>", () => {
  beforeEach(() => {
    store = mockStore(initState);
  });

  test("should init component", () => {
    const wrapper = handleMount(initState);
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });

  describe('should run action',() => {
    test('on item from home',() => {
      const wrapper = handleMount(initState);
      act(() => {
        wrapper.find(Breadcrumb).props().onItem({
          detail: '/'
        });
      })
      wrapper.update();
    })

    test('on item diferrent from home',() => {
      const wrapper = handleMount(initState);
      act(() => {
        wrapper.find(Breadcrumb).props().onItem({
          detail: '/payment'
        });
      })
      wrapper.update();
    })


    test('on back',() => {
      const wrapper = handleMount(initState);
      act(() => {
        wrapper.find(Breadcrumb).props().onBack();
      })
      wrapper.update();
    })
  })

 

  
});
