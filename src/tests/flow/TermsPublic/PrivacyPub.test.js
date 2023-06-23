import React from "react";
import { mount } from "enzyme";
import PrivacyPub from "../../../flow/Terms/components/PrivacyPub";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

window.scrollTo = jest.fn();
window.dataLayer = {
  push: jest.fn()
}

let initState = {};

let store = mockStore(initState);
const handleMount = (initState) => {
  store = mockStore(initState);
  return mount(
    <Provider store={store}>
        <PrivacyPub />
    </Provider>
  );
};

describe("Test <PrivacyPub/>", () => {
  beforeEach(() => {
    store = mockStore(initState);
  });

  test("should init component", () => {
    const wrapper = handleMount(initState);
    expect(wrapper).toMatchSnapshot();
  });
});
