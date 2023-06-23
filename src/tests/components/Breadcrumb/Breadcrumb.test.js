import React from "react";
import { mount } from "enzyme";
import { Breadcrumb } from "../../../components/Breadcrumb/Breadcrumb";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

let initState = {
  data: {
    textItems: null,
    textColor: null,
    icon: null
  },
};

let store = mockStore(initState);
const handleMount = (initState) => {
  store = mockStore(initState);
  return mount(
    <Provider store={store}>
      <Breadcrumb data={initState.data} />
    </Provider>
  );
};

describe("Test <Breadcrumb />", () => {
  test("should init component", () => {
    const wrapper = handleMount(initState);
    expect(wrapper).toMatchSnapshot();
  });
});
