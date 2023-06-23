import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Moral from "../../../../../flow/Payment/Forms/Moral/Moral";
import { FormBuilder } from "react-reactive-form";
import { act } from "react-dom/test-utils";
import { Input } from "../../../../../components/Input/Input";
import { paymentText } from "../../../../../texts/paymentText";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

let initState = {
  payment: {
    editForm: null,
  },
  texts: {
    payment: {
      ...paymentText
    }
  }
};

window.dataLayer = {
  push: jest.fn()
}

let store = mockStore(initState);

const handleMount = (initState) => {
  store = mockStore(initState);
  return mount(
    <Provider store={store}>
      <Moral />
    </Provider> 
  );
};

describe("Test <Moral/>", () => {
  beforeEach(() => {

  });

  test("should init component", () => {
    initState = {
      ...initState,
      payment: {
        ...initState.payment,
        editForm:{
          "id": 27,
          "userId": 346901,
          "fullName": "Jonathan Arias",
          "rfc": "AIGJ850907N8A",
          "curp": "HEAE91122",
          "email": "jagorax@gmail.com",
          "address": {
            "street": "LUIS BRAILLE ",
            "neighborhood": "INDEPENDENCIA",
            "city": "CDMX",
            "state": "08",
            "zipCode": "5678"
          },
          "cfdiUsage": "G03",
          "personType": 1,
          "default": false,
          "isDefault": false
        }
      }
    }
    const wrapper = handleMount(initState);
    //moralForm.get = jest)
    initState = {
      ...initState,
      payment: {
        ...initState.payment,
        editForm: {
          ...initState.payment.editForm,
          curp: '1234'
        }
      }
    }
    wrapper.update();

    act(() => {
      wrapper.find(Input).at(3).props().eventKeyPress({
        detail: {
          value: '123'
        }
      })
    })
    expect(wrapper.find(".inputtax").exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();

  });
});
