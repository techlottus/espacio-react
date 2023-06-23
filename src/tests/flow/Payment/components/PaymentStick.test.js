import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import PaymentStick from "../../../../flow/Payment/components/PaymentStick";
import { PaymentContext } from "../../../../flow/Payment/PaymentContext";
import { Button } from "../../../../components/Button/Button";
import { typesPaymentMethods } from "../../../../constants/Payment.constant";
import { act } from "react-dom/test-utils";
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
        <PaymentStick />
      </Provider>
    </PaymentContext.Provider>
  );
};

describe("Test <PaymentStick/>", () => {
  beforeEach(() => {
  });

  test("should init component", () => {
    const wrapper = handleMount(initState);
    expect(wrapper).toMatchSnapshot();
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
          price: 10, 
        },
        selectMethod: typesPaymentMethods.deposit,
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
          price: 10,
        },
        selectMethod: typesPaymentMethods.mercadoPago,
      },
    };
    const wrapper = handleMount(initState);
    expect(wrapper.find(Button).last().props().data.title).toBe("Pagar");
  });

  test("should empty concept", () => {
    initState = {
      ...initState,
      payment: {
        ...initState.payment,
        selectConcept: null,
      },
    };
    const wrapper = handleMount(initState);
    expect(wrapper.find(".paymentsticktitle").text()).toBe("No tienes conceptos cargados");
  });

  test("should resume concept", () => {
    initState = {
      ...initState,
      payment: {
        ...initState.payment,
        selectConcept: null,
      },
    };
    const wrapper = handleMount(initState);
    act(() => {
      wrapper.find("span.material-icons").props().onClick()
    })
    wrapper.update()
    expect(wrapper.find(".paymentsticktitle").text()).toBe("Resumen de compra");
  });

  test("should select concept", () => {
    initState = {
      ...initState,
      payment: {
        ...initState.payment,
        selectConcept: {
          description: "test",
          title: "test",
          subtitle: "test",
          price: 20,
        },
      },
    };
    const wrapper = handleMount(initState);
    act(() => {
      wrapper.find("span.material-icons").props().onClick()
    })
    wrapper.update()
    expect(wrapper.find(".paymentsticktitle").text()).toBe("Resumen de compra");
  });

  test("should click button", () => {
    const wrapper = handleMount(initState);
    act(() => {
      wrapper.find(Button).first().props().onClick();
    });
    wrapper.update();
    expect(setIsModalPayment).toHaveBeenCalled();
  });
});
