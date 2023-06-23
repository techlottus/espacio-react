import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { typesRequestErrors } from "../../../../constants/error.constant";
import { PaymentContext } from "../../../../flow/Payment/PaymentContext";
import { act } from "react-dom/test-utils";
import { Button } from "../../../../components/Button/Button";
import { typesPaymentMethods } from "../../../../constants/Payment.constant";
import { paymentText } from "../../../../texts/paymentText";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

window.dataLayer = {
  push: jest.fn()
}

let initState = {
  payment: {
    selectConcept: {
      description: "test",
      title: "test",
      subtitle: "test",
      price: 20,
    },
    selectMethod: null,
    errors: {
      [typesRequestErrors.getConcepts]: {
        isError: false,
        msg: null,
      },
    },
  },
  texts: {
    payment: {
      ...paymentText
    }
  }
};

let store = mockStore(initState);

const setIsModalPayment = jest.fn().mockImplementation(() => {});

const handleMount = (initState) => {
  store = mockStore(initState);
  return mount(
    <PaymentContext.Provider value={{ setIsModalPayment }}>
      <Provider store={store}>
      </Provider>
    </PaymentContext.Provider>
  );
};

describe("Test <PaymentResumeDesktop/>", () => {
  beforeEach(() => {});

  test("should init component", () => {
    const wrapper = handleMount(initState);
    expect(wrapper).toMatchSnapshot();
  });

  test("should click button", () => {
    const wrapper = handleMount(initState);
    act(() => {
      wrapper.find(Button).first().props().onClick();
    });
    wrapper.update();
    expect(setIsModalPayment).toHaveBeenCalled();
  });

  test("should empty select concept", () => {
    initState = {
      ...initState,
      payment: {
        ...initState.payment,
        selectConcept: null,
      },
    };
    const wrapper = handleMount(initState);
    expect(wrapper.find(".paymentresumedesktopempty").exists()).toBe(true);
  });

  test("should download button", () => {
    initState = {
      ...initState,
      payment: {
        ...initState.payment,
        selectConcept: {
          description: null,
          title: null,
          subtitle: null,
          price: 20,
        },
        selectMethod: typesPaymentMethods.deposit
      },
    };
    const wrapper = handleMount(initState);
    expect(wrapper.find(Button).last().props().data.title).toBe("Descargar");
  });

  test("should pay button", () => {
    initState = {
      ...initState,
      payment: {
        ...initState.payment,
        selectConcept: {
          description: null,
          title: null,
          subtitle: null,
          price: 20,
        },
        selectMethod: typesPaymentMethods.mercadoPago
      },
    };
    const wrapper = handleMount(initState);
    expect(wrapper.find(Button).last().props().data.title).toBe("Pagar");
  });
});
