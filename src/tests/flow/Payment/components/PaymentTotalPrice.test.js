import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import PaymentTotalPrice from "../../../../flow/Payment/components/PaymentTotalPrice";
import { paymentText } from "../../../../texts/paymentText";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
window.dataLayer = {
  push: jest.fn()
}

const initState = {
  payment: {
    data: {
      quotes: [
        {
          quote: "test",
        },
      ],
    },
  },
  texts: {
    payment: {
      ...paymentText
    }
  }
};

let store = mockStore(initState);

const handleMount = (initState) => {
  store = mockStore(initState);
  return mount(
    <Provider store={store}>
      <PaymentTotalPrice />
    </Provider>
  );
};

describe("Test <PaymentTotalPrice/>", () => {
  beforeEach(() => {});

  test("should init component", () => {
    const wrapper = handleMount(initState);
    expect(wrapper.find(".paymenttotalprice").exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });
});
