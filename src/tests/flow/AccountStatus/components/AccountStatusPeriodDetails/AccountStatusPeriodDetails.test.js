import React from "react";
import { mount } from "enzyme";
import { Provider, useDispatch } from "react-redux";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import AccountStatusPeriodDetails from "../../../../../flow/AccountStatus/components/AccountPeriodDetails/AccountStatusPeriodDetails";
import { typesRequestErrors } from "../../../../../constants/error.constant";
import { Select } from "../../../../../components/Select/Select";
import { act } from "react-dom/test-utils";
import { filtersMock, formatProgramsMock, movementsMock, programsMock } from "../../../../../fixtures/accountStatusPeriodDetailsFixture";
import { renderHook } from "@testing-library/react-hooks";
import { CardMovement } from "../../../../../components/Card/CardMovement";
import { BrowserRouter } from "react-router-dom";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };

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
};


let store = mockStore(initState);

const { result } = renderHook(() => useDispatch())

const handleMount = (initState) => {
  store = mockStore(initState);  
  return mount(
    <Provider store={store}>
      <BrowserRouter>
        <AccountStatusPeriodDetails history={historyMock} />
      </BrowserRouter>
    </Provider>
  );
};

describe("Test <AccountStatusPeriodDetails />", () => {
  beforeEach(() => {});

  test("should init component", () => {
    const wrapper = handleMount(initState);
    expect(wrapper).toMatchSnapshot();
  });

  test("should click select program", () => {
    const wrapper = handleMount(initState);
    act(() => {
      wrapper.find(Select).first().props().onClick({   
        detail: 0,
      });
    });
    wrapper.update();
  });

  test("should click select period", () => {
    initState = {
      ...initState,
      accountStatus: {
        ...initState.accountStatus,
        programs: programsMock
      }
      
    };
    const wrapper = handleMount(initState);
    expect(wrapper.find(Select).exists()).toBe(true);
    act(() => {
      wrapper.find(Select).last().props().onClick({
        detail: 0,
      });
    });
    wrapper.update();
  });

  test("should valid programs and periods", () => {
    const wrapper = handleMount(initState);
    expect(wrapper.find(Select).first().props().options).toEqual(formatProgramsMock);
    act(() => {
      wrapper.find(Select).first().props().onClick({
        detail: 'LEINSC334'
      })
      wrapper.update();
    });
    expect(wrapper.find(Select).last().props().options).toEqual(filtersMock);
    act(() => {
      wrapper.find(Select).last().props().onClick({
        detail: '202042'
      })
      wrapper.update();
    });
    
  });

  test("should valid movements and onBtn", () => {
    initState = {
      ...initState,
      accountStatus: {
        ...initState.accountStatus,
        programs: null,
        movements: movementsMock
      }
      
    };
    const wrapper = handleMount(initState);
    expect(wrapper.find(CardMovement).exists()).toBe(true);
    act(() => {
      wrapper.find(CardMovement).first().props().onBtn({})
    });
    wrapper.update();
  })
});