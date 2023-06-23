import React from "react";
import { mount } from "enzyme";
import Information from "../../../../../flow/Procedures/components/ProcedureLayout/views/Information";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { act } from "react-dom/test-utils";
import { ProceduresContext } from "../../../../../flow/Procedures/ProceduresContext";
import { BrowserRouter } from "react-router-dom";
import { Breadcrumb } from "../../../../../components/Breadcrumb/Breadcrumb";
import { typesRequestErrors } from "../../../../../constants/error.constant";
import { Button } from "../../../../../components/Button/Button";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

window.scrollTo = jest.fn();

let initState = {
  procedures: {
    requestInquiryAll: null,
    proceduresAll: null,
    profile: null,
    errors: {
      [typesRequestErrors.getInformationProcedures]: {
        isError: false,
        msg: null,
      },
    },
  },
};

const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };
const setIsModalAcordeon = jest.fn().mockImplementation(() => {});
let store = mockStore(initState);
const handleMount = (initState, type) => {
  store = mockStore(initState);
  return mount(
    <ProceduresContext.Provider value={{ setIsModalAcordeon }}>
      <Provider store={store}>
        <BrowserRouter>
          <Information type={type} history={historyMock} />
        </BrowserRouter>
      </Provider>
    </ProceduresContext.Provider>
  );
};

describe("Test <Information/>", () => {
  test("should init component", () => {
    const wrapper = handleMount(initState, { flow: "current" });
    expect(wrapper).toMatchSnapshot();
  });

  test("should go back on", () => {
    const wrapper = handleMount(initState, { flow: "current" });
    act(() => {
      wrapper.find(Breadcrumb).props().onBack();
    });
    wrapper.update();
  });

  describe("Switch on btn with information", () => {
    test("Should switch between flows", () => {
      let wrapper = handleMount(initState, { flow: "certificate-study" });
      act(() => {
        wrapper.find(".info-btn").find(Button).props().onClick();
      });
      wrapper.update();
      wrapper = handleMount(initState, { flow: "equivalence-study" });
      act(() => {
        wrapper.find(".info-btn").find(Button).props().onClick();
      });
      wrapper.update();
      wrapper = handleMount(initState, { flow: "reinstatement" });
      act(() => {
        wrapper.find(".info-btn").find(Button).props().onClick();
      });
      wrapper.update();
    });
  });
  describe("Switch on breadcrum", () => {
    test("should redirect to dashboard", () => {
      const wrapper = handleMount(initState, { flow: "current" });
      act(() => {
        wrapper.find(Breadcrumb).props().onItem({ detail: "/" });
      });
      wrapper.update();
    });
    test("should redirect to main procedure", () => {
      const wrapper = handleMount(initState, { flow: "current" });
      act(() => {
        wrapper.find(Breadcrumb).props().onItem({ detail: "/procedures-main" });
      });
      wrapper.update();
    });
    test("should redirect to default", () => {
      const wrapper = handleMount(initState, { flow: "current" });
      act(() => {
        wrapper.find(Breadcrumb).props().onItem({ detail: "/main" });
      });
      wrapper.update();
    });
  });
});
