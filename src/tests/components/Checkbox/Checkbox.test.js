import React from "react";
import { mount } from "enzyme";
import { Checkbox } from "../../../components/Checkbox/Checkbox";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

let initState = {
  data: {
    label: null,
    disabled: null,
    selected: null,
    name: null,
  },
};

let store = mockStore(initState);
const handleMount = (initState) => {
  store = mockStore(initState);
  return mount(
    <Provider store={store}>
      <Checkbox data={initState.data} />
    </Provider>
  );
};

describe("Test <Checkbox />", () => {
  test("should init component", () => {
    const wrapper = handleMount(initState);
    expect(wrapper).toMatchSnapshot();
  });
});
