import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Welcome from "../../../layout/Terms/views/Welcome";
import { termsText } from "../../../texts/termsText";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
window.dataLayer = {
  push: jest.fn()
}

const initState = {
  texts: {
    terms: {
      ...termsText
    }
  }
};
let store = mockStore(initState);


const wrapper = mount(
  <Provider store={store}>
    <Welcome />
  </Provider>
);

describe("Test <Welcome/> ", () => {
  beforeEach(() => {
    store = mockStore(initState);
  });

  test("should init component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
