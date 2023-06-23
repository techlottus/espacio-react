import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Paginator } from "../../../components/Paginator/Paginator";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

let initState;
let data = {
    iconPrevious: "",
    iconNext: "",
    size: "",
    maxNumbers: 0,
};

let store = mockStore(initState);
const handleMount = (initState) => {
  store = mockStore(initState);
  return mount(
    <Provider store={store}>
      <Paginator data={data} />
    </Provider>
  );
};

describe("Test <Paginator/>", () => {
  test("should init component", () => {
    const wrapper = handleMount(initState);
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });
});
