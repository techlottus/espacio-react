import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Physical from "../../../../../flow/Payment/Forms/Physical/Physical";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  payment: {
    editForm: null,
  },
};

let store = mockStore(initState);

window.dataLayer = {
  push: jest.fn()
}

const handleMount = (initState) => {
  store = mockStore(initState);
  return mount(
    <Provider store={store}>
      <Physical /> 
    </Provider>
  );
};

describe("Test <Physical/>", () => {
  beforeEach(() => {

  });

  test("should init component", () => {
    const wrapper = handleMount(initState);
    expect(wrapper.find(".inputtax").exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });
});
