import React from "react";
import { mount } from "enzyme";
import ProcedureLayout from "../../../../../flow/Procedures/components/ProcedureLayout/ProcedureLayout";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { act } from "react-dom/test-utils";
import { ProceduresContext } from "../../../../../flow/Procedures/ProceduresContext";
import { BrowserRouter } from "react-router-dom";
import { typesRequestErrors } from "../../../../../constants/error.constant";
import EmptyState from "../../../../../components/EmptyState/EmptyState";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

window.scrollTo = jest.fn();

let initState = {
  procedures:{
    requestInquiryAll: null,
    proceduresAll: null, 
    profile: null,
    errors: {
      [typesRequestErrors.getInformationProcedures]: {
        isError: false,
        msg: null,
      },
    }
  }
};
const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };
const steps = {
  focus: 0,
  titles: [
    {
      text: "Información",
      disabled: false,
    },
    {
      text: "Documentación",
      disabled: false,
    },
  ],
  off: false,
};
let store = mockStore(initState);
const handleMount = (initState) => {
  store = mockStore(initState);
  return mount(
    <ProceduresContext.Provider value={{steps}}>
      <Provider store={store}>
        <BrowserRouter>
          <ProcedureLayout />
        </BrowserRouter>
      </Provider>
    </ProceduresContext.Provider>
  );
};

describe("Test <ProcedureLayout/>", () => {
  test("should init component", () => {
    const wrapper = handleMount(initState);
    expect(wrapper).toMatchSnapshot();
  });

  test('should dispatch on mount', () => {
    const wrapper = handleMount(initState);
    wrapper.unmount()
  })
  describe('show errors', () => {
    test('should go back ond empty state component', () => {
      initState={
        ...initState,
        procedures:{
          ...initState.procedures,
          errors:{
            ...initState.procedures.errors,
            [typesRequestErrors.getInformationProcedures]: {
              isError: true,
              msg: 'error',
            },
          }
        }
      }
      const wrapper = handleMount(initState)
      act(() => {
        wrapper.find(EmptyState).props().action()
      })
  
      wrapper.update()
    })
  })

});
