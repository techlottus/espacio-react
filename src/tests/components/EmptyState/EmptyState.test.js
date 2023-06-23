import React from "react";
import { mount } from "enzyme";
import EmptyState from "../../../components/EmptyState/EmptyState";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

let initState = {

};
let store = mockStore(initState);
const handleMount = (initState) => {
  store = mockStore(initState);
  return mount(
    <Provider store={store}>
      <EmptyState />
    </Provider>
  );
};

describe("Test <EmptyState />", () => {
  test("should init component", () => {
    const wrapper = handleMount(initState);
    expect(wrapper).toMatchSnapshot();
  });
});
