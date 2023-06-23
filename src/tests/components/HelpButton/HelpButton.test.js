import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import HelpButton from "../../../components/HelpButton/HelpButton";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

let initState;
let name = "";

let store = mockStore(initState);
const handleMount = (initState) => {
  store = mockStore(initState);
  return mount(
    <Provider store={store}>
      <HelpButton name={name} />
    </Provider>
  );
};

describe("Test <HelpButton/>", () => {
  test("should init component", () => {
    const wrapper = handleMount(initState);
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });
});
